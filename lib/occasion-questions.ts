export type OccasionQuestionOption = {
  id: string;
  labelEn: string;
  labelKo: string;
};

export type OccasionQuestion = {
  titleEn: string;
  titleKo: string;
  /** Legacy queued v1 answers use these IDs; the current UI accepts free text. */
  options: OccasionQuestionOption[];
};

export type OccasionQuestions = {
  question1: OccasionQuestion;
  question2: OccasionQuestion;
};

const options = (...values: Array<[string, string, string]>): OccasionQuestionOption[] =>
  values.map(([id, labelEn, labelKo]) => ({ id, labelEn, labelKo }));

export const OCCASION_QUESTIONS_MAP: Record<string, OccasionQuestions> = {
  "birthday-room": {
    question1: {
      titleEn: "How was %PET_NAME% feeling on this day?",
      titleKo: "이날 %PET_NAME%의 기분은 어땠나요?",
      options: options(
        ["excited-playful", "Excited and playful", "신나고 장난스러웠어요"],
        ["calm-peaceful", "Calm and peaceful", "차분하고 평온했어요"],
        ["affectionate-snuggly", "Affectionate and cuddly", "다정하고 포근했어요"],
        ["content-sleepy", "Content and sleepy", "만족스럽고 나른했어요"],
      ),
    },
    question2: {
      titleEn: "What made this birthday meaningful?",
      titleKo: "이번 생일을 특별하게 만든 건 무엇인가요?",
      options: options(
        ["growing-together", "Seeing how much we've grown together", "함께 자라 온 시간을 돌아보는 것"],
        ["their-joy", "Seeing %PET_NAME%'s joy", "%PET_NAME%의 기쁜 모습을 보는 것"],
        ["another-year", "Celebrating another year together", "함께한 한 해를 기념하는 것"],
        ["simple-moment", "A simple moment that felt like us", "우리다운 소박한 순간을 나누는 것"],
      ),
    },
  },
  "adoption-day": {
    question1: {
      titleEn: "How did this special day feel to you?",
      titleKo: "이 특별한 날은 어떤 마음으로 기억되나요?",
      options: options(
        ["joyful-grateful", "Joyful and grateful", "기쁘고 감사한 마음"],
        ["emotional-moved", "Emotional and moving", "뭉클하고 마음이 벅찬 느낌"],
        ["peaceful-tender", "Peaceful and tender", "평온하고 다정한 느낌"],
        ["excited-hopeful", "Excited and hopeful", "설레고 희망찬 마음"],
      ),
    },
    question2: {
      titleEn: "What does this anniversary mean to you?",
      titleKo: "이 기념일은 어떤 의미인가요?",
      options: options(
        ["beginning-together", "The beginning of our life together", "함께한 삶의 시작"],
        ["forever-family", "The feeling of being family", "가족이 된다는 마음"],
        ["life-changed", "A moment that changed my life", "내 삶이 달라진 순간"],
        ["cherished-bond", "A bond I hold close", "소중히 간직하는 인연"],
      ),
    },
  },
  "christmas-village": {
    question1: {
      titleEn: "What feeling do you associate with this day?",
      titleKo: "이날을 떠올리면 어떤 기분이 드나요?",
      options: options(
        ["festive-warm", "Festive and warm", "축제처럼 따뜻한 느낌"],
        ["cozy-peaceful", "Cozy and peaceful", "포근하고 평온한 느낌"],
        ["joyful-bright", "Joyful and bright", "기쁘고 밝은 느낌"],
        ["quiet-tender", "Quiet and tender", "조용하고 다정한 느낌"],
      ),
    },
    question2: {
      titleEn: "What does this season mean to you?",
      titleKo: "이 계절은 어떤 의미로 다가오나요?",
      options: options(
        ["togetherness", "A sense of togetherness", "함께라는 마음"],
        ["small-joys", "Noticing small joys", "작은 기쁨을 발견하는 것"],
        ["warmth", "A feeling of warmth", "따뜻함을 느끼는 것"],
        ["quiet-reflection", "A quiet moment to reflect", "조용히 마음을 돌아보는 시간"],
      ),
    },
  },
  "spring-picnic": {
    question1: {
      titleEn: "How did this spring moment feel?",
      titleKo: "이 봄날의 순간은 어떤 느낌이었나요?",
      options: options(
        ["playful-energetic", "Playful and energetic", "장난스럽고 활기찼어요"],
        ["gentle-curious", "Gentle and curious", "다정하고 호기심이 많았어요"],
        ["relaxed-happy", "Relaxed and happy", "느긋하고 행복했어요"],
        ["calm-renewed", "Calm and refreshed", "차분하고 새로워진 기분이었어요"],
      ),
    },
    question2: {
      titleEn: "What did this moment mean to you?",
      titleKo: "이 순간은 어떤 의미로 남았나요?",
      options: options(
        ["season-changing", "Welcoming a new season", "새로운 계절을 맞이하는 것"],
        ["shared-time", "Time shared together", "함께 보낸 시간"],
        ["fresh-start", "A feeling of a fresh start", "새롭게 시작하는 기분"],
        ["simple-freedom", "A little freedom and joy", "작은 자유와 기쁨"],
      ),
    },
  },
  "summer-beach": {
    question1: {
      titleEn: "What was the feeling of this day?",
      titleKo: "이날의 기분은 어땠나요?",
      options: options(
        ["excited-adventure", "Excited and adventurous", "설레고 모험을 꿈꾸는 느낌"],
        ["peaceful-calm", "Peaceful and calm", "평온하고 차분한 느낌"],
        ["joyful-carefree", "Joyful and carefree", "기쁘고 자유로운 느낌"],
        ["content-blissful", "Content and blissful", "만족스럽고 행복한 느낌"],
      ),
    },
    question2: {
      titleEn: "What feeling would you like to remember?",
      titleKo: "어떤 마음을 오래 간직하고 싶나요?",
      options: options(
        ["natural-beauty", "The beauty around us", "우리 곁의 아름다움"],
        ["simple-presence", "Simply being together", "그저 함께 있다는 것"],
        ["peaceful-moment", "A peaceful moment", "평온했던 한순간"],
        ["cherished-memory", "A memory I hold dear", "소중히 간직할 추억"],
      ),
    },
  },
  "autumn-walk": {
    question1: {
      titleEn: "What was the mood of this moment?",
      titleKo: "이 순간의 분위기는 어땠나요?",
      options: options(
        ["peaceful-reflective", "Peaceful and reflective", "고요하고 생각에 잠기는 느낌"],
        ["joyful-curious", "Joyful and curious", "기쁘고 호기심 어린 느낌"],
        ["gentle-serene", "Gentle and serene", "부드럽고 평온한 느낌"],
        ["energetic-playful", "Energetic and playful", "활기차고 장난스러운 느낌"],
      ),
    },
    question2: {
      titleEn: "What would you like to hold onto?",
      titleKo: "어떤 마음을 간직하고 싶나요?",
      options: options(
        ["changing-leaves", "The beauty of change", "변화 속 아름다움"],
        ["quiet-stillness", "A quiet moment together", "함께한 고요한 순간"],
        ["gentle-air", "The gentle air and light", "부드러운 바람과 빛"],
        ["small-joy", "A small shared joy", "함께 나눈 작은 기쁨"],
      ),
    },
  },
  "first-snow-street": {
    question1: {
      titleEn: "What was the feeling of this snowy moment?",
      titleKo: "눈 내리는 이 순간은 어떤 느낌이었나요?",
      options: options(
        ["magical-wonder", "Magical and full of wonder", "신비롭고 놀라운 느낌"],
        ["peaceful-quiet", "Peaceful and quiet", "평온하고 고요한 느낌"],
        ["cozy-warm", "Cozy and warm-hearted", "포근하고 따뜻한 마음"],
        ["joyful-innocent", "Joyful and carefree", "기쁘고 순수한 느낌"],
      ),
    },
    question2: {
      titleEn: "What would you like to remember about this day?",
      titleKo: "이날 어떤 마음을 기억하고 싶나요?",
      options: options(
        ["snow-beauty", "The beauty of the snow", "눈 내리는 풍경의 아름다움"],
        ["quiet-moment", "A quiet moment together", "함께한 고요한 순간"],
        ["simple-peace", "A simple feeling of peace", "소박한 평온함"],
        ["cherished-together", "The feeling of being together", "함께 있다는 마음"],
      ),
    },
  },
};

export const NO_OCCASION_QUESTIONS: OccasionQuestions = {
  question1: {
    titleEn: "What is %PET_NAME% like?",
    titleKo: "%PET_NAME%는 어떤 아이인가요?",
    options: options(
      ["playful-active", "Playful and active", "장난스럽고 활발해요"],
      ["calm-gentle", "Calm and gentle", "차분하고 다정해요"],
      ["affectionate-loyal", "Affectionate and loyal", "애정이 많고 한결같아요"],
      ["curious-independent", "Curious and independent", "호기심 많고 독립적이에요"],
    ),
  },
  question2: {
    titleEn: "What do you love about your everyday moments together?",
    titleKo: "함께하는 평소 순간 중 무엇이 가장 좋나요?",
    options: options(
      ["ordinary-moment", "An ordinary precious moment", "평범하지만 소중한 순간"],
      ["favorite-ritual", "A little everyday routine", "우리만의 작은 일상"],
      ["unexpected-beauty", "A small, unexpected joy", "뜻밖에 찾아온 작은 기쁨"],
      ["just-together", "Simply being together", "그저 함께하는 시간"],
    ),
  },
};

/** Past-looking copy for Memorial pets; the Living wording above stays unchanged. */
export const NO_OCCASION_MEMORIAL_QUESTIONS: OccasionQuestions = {
  question1: {
    ...NO_OCCASION_QUESTIONS.question1,
    titleEn: "What was %PET_NAME% like?",
    titleKo: "%PET_NAME%는 어떤 아이였나요?",
  },
  question2: {
    ...NO_OCCASION_QUESTIONS.question2,
    titleEn: "Which everyday moments with %PET_NAME% do you remember most fondly?",
    titleKo: "함께했던 평소의 순간 중 어떤 기억을 가장 소중히 간직하고 있나요?",
  },
};

export const MY_PHOTO_BACKGROUND_QUESTIONS: OccasionQuestions = {
  question1: {
    titleEn: "What would you like us to notice about %PET_NAME% in this photo?",
    titleKo: "이 사진 속 %PET_NAME%의 어떤 모습을 담고 싶나요?",
    options: options(
      ["pet-expression", "Their expression and personality", "표정과 성격"],
      ["pet-presence", "The way they are simply being themselves", "있는 그대로의 모습"],
      ["pet-details", "Their little details and markings", "작은 특징과 무늬"],
      ["pet-pose", "Their pose in this moment", "이 순간의 자세"],
    ),
  },
  question2: {
    titleEn: "What feeling sits behind this moment?",
    titleKo: "이 순간에 담긴 마음은 무엇인가요?",
    options: options(
      ["favorite-moment", "A favorite moment", "가장 좋아하는 순간"],
      ["peaceful-day", "A peaceful feeling", "평온한 마음"],
      ["treasured-memory", "A treasured memory", "소중히 간직할 추억"],
      ["simple-joy", "A simple moment of joy", "소박한 기쁨의 순간"],
    ),
  },
};

export function getOccasionQuestions(
  occasionId: string | undefined,
  generationMode: string | undefined,
  status?: "living" | "passed",
): OccasionQuestions | null {
  if (generationMode === "preserve-original-scene") return MY_PHOTO_BACKGROUND_QUESTIONS;
  if (occasionId && occasionId in OCCASION_QUESTIONS_MAP) return OCCASION_QUESTIONS_MAP[occasionId]!;
  if (occasionId) return null;
  return status === "passed" ? NO_OCCASION_MEMORIAL_QUESTIONS : NO_OCCASION_QUESTIONS;
}

export function getOccasionQuestionLabel(
  occasionId: string | undefined,
  generationMode: string | undefined,
  question: "question1" | "question2",
  optionId: string,
  locale: "en" | "ko",
): string | null {
  const config = getOccasionQuestions(occasionId, generationMode);
  const option = config?.[question].options.find((item) => item.id === optionId);
  if (!option) return null;
  return (locale === "ko" ? option.labelKo : option.labelEn)
    .replaceAll("%PET_NAME%", locale === "ko" ? "반려동물" : "your pet");
}

