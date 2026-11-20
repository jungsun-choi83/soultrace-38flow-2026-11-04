import assert from "node:assert/strict";
import test from "node:test";

import {
  getOccasionQuestionLabel,
  getOccasionQuestions,
  NO_OCCASION_MEMORIAL_QUESTIONS,
  NO_OCCASION_QUESTIONS,
  OCCASION_QUESTIONS_MAP,
} from "./occasion-questions.ts";

test("every implemented occasion has stable option IDs and readable English and Korean labels", () => {
  assert.equal(Object.keys(OCCASION_QUESTIONS_MAP).length, 7);
  for (const [occasionId, questions] of Object.entries(OCCASION_QUESTIONS_MAP)) {
    for (const [questionId, question] of Object.entries(questions)) {
      assert.ok(question.titleEn.trim(), `${occasionId}/${questionId} has English question text`);
      assert.ok(question.titleKo.trim(), `${occasionId}/${questionId} has Korean question text`);
      assert.equal(new Set(question.options.map((option) => option.id)).size, question.options.length);
      for (const option of question.options) {
        assert.match(option.id, /^[a-z0-9-]+$/);
        assert.ok(option.labelEn.trim(), `${occasionId}/${questionId}/${option.id} has English label`);
        assert.ok(option.labelKo.trim(), `${occasionId}/${questionId}/${option.id} has Korean label`);
        assert.doesNotMatch(option.labelKo, /[?]{2,}|[\uFFFD]/u, `${occasionId}/${questionId}/${option.id} is not corrupted`);
        assert.equal(getOccasionQuestionLabel(occasionId, undefined, questionId as "question1" | "question2", option.id, "en"), option.labelEn.replaceAll("%PET_NAME%", "your pet"));
        assert.equal(getOccasionQuestionLabel(occasionId, undefined, questionId as "question1" | "question2", option.id, "ko"), option.labelKo.replaceAll("%PET_NAME%", "반려동물"));
      }
    }
  }
});

test("birthday, adoption, no occasion, and My Photo & Background wording follow their intended meaning", () => {
  const birthday = getOccasionQuestions("birthday-room", undefined)!;
  assert.equal(birthday.question1.titleEn, "How was %PET_NAME% feeling on this day?");
  assert.equal(birthday.question2.titleEn, "What made this birthday meaningful?");
  assert.match(birthday.question1.titleEn.replace("%PET_NAME%", "Mochi"), /Mochi/);
  assert.equal(birthday.question1.titleKo.replaceAll("%PET_NAME%", "코코"), "이날 코코의 기분은 어땠나요?");

  const adoption = getOccasionQuestions("adoption-day", undefined)!;
  assert.equal(adoption.question1.titleEn, "How did this special day feel to you?");
  assert.equal(adoption.question2.titleEn, "What does this anniversary mean to you?");
  assert.doesNotMatch(JSON.stringify(adoption), /shelter|family gathering/i);

  assert.match(NO_OCCASION_QUESTIONS.question1.titleEn, /What is %PET_NAME% like/);
  assert.match(NO_OCCASION_QUESTIONS.question2.titleEn, /everyday moments/i);
  const photoMode = getOccasionQuestions(undefined, "preserve-original-scene")!;
  assert.match(photoMode.question1.titleEn, /%PET_NAME%/);
  assert.match(photoMode.question1.titleKo.replaceAll("%PET_NAME%", "코코"), /코코/);
  assert.match(photoMode.question1.titleEn, /photo/i);
  assert.match(photoMode.question2.titleEn, /feeling/i);
});

test("Memorial gets past-looking No Occasion questions while Living copy remains unchanged in both languages", () => {
  const living = getOccasionQuestions(undefined, undefined, "living")!;
  assert.equal(living, NO_OCCASION_QUESTIONS);
  assert.equal(living.question1.titleEn, "What is %PET_NAME% like?");
  assert.equal(living.question2.titleEn, "What do you love about your everyday moments together?");

  const memorial = getOccasionQuestions(undefined, undefined, "passed")!;
  assert.equal(memorial, NO_OCCASION_MEMORIAL_QUESTIONS);
  assert.equal(memorial.question1.titleEn, "What was %PET_NAME% like?");
  assert.equal(memorial.question1.titleKo.replaceAll("%PET_NAME%", "모찌"), "모찌는 어떤 아이였나요?");
  assert.equal(memorial.question2.titleEn, "Which everyday moments with %PET_NAME% do you remember most fondly?");
  assert.equal(memorial.question2.titleKo, "함께했던 평소의 순간 중 어떤 기억을 가장 소중히 간직하고 있나요?");
  assert.equal(memorial.question1.options.length, living.question1.options.length);
  assert.equal(memorial.question2.options.length, living.question2.options.length);
});

test("occasion and My Photo & Background wording remains shared with Memorial", () => {
  for (const occasionId of Object.keys(OCCASION_QUESTIONS_MAP)) {
    assert.equal(getOccasionQuestions(occasionId, undefined, "passed"), getOccasionQuestions(occasionId, undefined, "living"));
  }
  assert.equal(
    getOccasionQuestions(undefined, "preserve-original-scene", "passed"),
    getOccasionQuestions(undefined, "preserve-original-scene", "living"),
  );
});

test("Christmas keeps its existing English and Korean question wording", () => {
  const christmas = getOccasionQuestions("christmas-village", undefined)!;
  assert.equal(christmas.question1.titleEn, "What feeling do you associate with this day?");
  assert.equal(christmas.question1.titleKo, "이날을 떠올리면 어떤 기분이 드나요?");
  assert.equal(christmas.question2.titleEn, "What does this season mean to you?");
  assert.equal(christmas.question2.titleKo, "이 계절은 어떤 의미로 다가오나요?");
});

test("all seven occasions keep their current question titles in both languages", () => {
  const expected: Record<string, readonly [string, string, string, string]> = {
    "birthday-room": ["How was %PET_NAME% feeling on this day?", "이날 %PET_NAME%의 기분은 어땠나요?", "What made this birthday meaningful?", "이번 생일을 특별하게 만든 건 무엇인가요?"],
    "adoption-day": ["How did this special day feel to you?", "이 특별한 날은 어떤 마음으로 기억되나요?", "What does this anniversary mean to you?", "이 기념일은 어떤 의미인가요?"],
    "christmas-village": ["What feeling do you associate with this day?", "이날을 떠올리면 어떤 기분이 드나요?", "What does this season mean to you?", "이 계절은 어떤 의미로 다가오나요?"],
    "spring-picnic": ["How did this spring moment feel?", "이 봄날의 순간은 어떤 느낌이었나요?", "What did this moment mean to you?", "이 순간은 어떤 의미로 남았나요?"],
    "summer-beach": ["What was the feeling of this day?", "이날의 기분은 어땠나요?", "What feeling would you like to remember?", "어떤 마음을 오래 간직하고 싶나요?"],
    "autumn-walk": ["What was the mood of this moment?", "이 순간의 분위기는 어땠나요?", "What would you like to hold onto?", "어떤 마음을 간직하고 싶나요?"],
    "first-snow-street": ["What was the feeling of this snowy moment?", "눈 내리는 이 순간은 어떤 느낌이었나요?", "What would you like to remember about this day?", "이날 어떤 마음을 기억하고 싶나요?"],
  };
  assert.deepEqual(Object.keys(OCCASION_QUESTIONS_MAP).sort(), Object.keys(expected).sort());
  for (const [occasionId, titles] of Object.entries(expected)) {
    const questions = OCCASION_QUESTIONS_MAP[occasionId]!;
    assert.deepEqual([questions.question1.titleEn, questions.question1.titleKo, questions.question2.titleEn, questions.question2.titleKo], titles);
  }
});
