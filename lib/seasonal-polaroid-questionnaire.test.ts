import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { HALLOWEEN_POLAROID_THEME } from "./seasonal-polaroid.ts";

const component = readFileSync("components/polaroid-entry.tsx", "utf8");
const route = readFileSync("app/api/seasonal-polaroid/route.ts", "utf8");
const admission = readFileSync("lib/seasonal-polaroid-admission.ts", "utf8");
const prompts = readFileSync("lib/seasonal-polaroid-prompts.ts", "utf8");
const en = JSON.parse(readFileSync("locales/en.json", "utf8")) as Record<string, unknown>;
const ko = JSON.parse(readFileSync("locales/ko.json", "utf8")) as Record<string, unknown>;
const at = (tree: Record<string, unknown>, path: string) => path.split(".").reduce<unknown>((node, key) => (node && typeof node === "object" ? (node as Record<string, unknown>)[key] : undefined), tree);

test("the questionnaire keeps its four-step flow and labels Step 3 for the occasion questions", () => {
  assert.match(component, /const STEP_IDS = \["meet", "scene", "questions", "preview"\]/);
  assert.match(component, /yearRound\.createPolaroid/);
  assert.match(component, /buildSeasonalPolaroidFormData\(questionnaire, primaryPhoto\.file, selectedPet\?\.petId\)/);
  assert.match(component, /everydayPolaroidArtStyles/);
  assert.match(component, /POLAROID_OCCASION_GROUPS/);
  assert.match(component, /data-polaroid-art-count=\{artThemes\.length\}/);
  assert.match(component, /data-polaroid-occasion-list=/);
  assert.doesNotMatch(component, /setCategory|art-style", "seasonal"/);
  assert.doesNotMatch(component, /미니어처 세상|별빛 유화|종이 콜라주/);
  for (const locale of [en, ko]) {
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.screen1.title"), "string");
    assert.equal(at(locale, "seasonalPolaroid.flow.screen6.personalLabel"), undefined);
    assert.equal(at(locale, "seasonalPolaroid.flow.screen6.personalPlaceholder"), undefined);
    assert.equal(at(locale, "seasonalPolaroid.flow.screen6.characterCount"), undefined);
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.yearRound.pageTitle"), "string");
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.yearRound.steps.questions"), "string");
    assert.equal(at(locale, "seasonalPolaroid.flow.validation.occasionQuestion1"), undefined);
    assert.equal(at(locale, "seasonalPolaroid.flow.validation.occasionQuestion2"), undefined);
  }
});

test("the photo step has exactly one upload slot and sends only that photo", () => {
  assert.equal((component.match(/<PhotoSlotView\b/g) ?? []).length, 1);
  assert.equal((component.match(/type="file"/g) ?? []).length, 1);
  assert.match(component, /buildSeasonalPolaroidFormData\(questionnaire, primaryPhoto\.file, selectedPet\?\.petId\)/);
  assert.doesNotMatch(component, /secondPhoto|secondInputRef|PhotoSlot\b|screen2\.secondLabel/);
  for (const locale of [en, ko]) {
    assert.equal(at(locale, "seasonalPolaroid.flow.screen2.secondLabel"), undefined);
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.screen2.primaryLabel"), "string");
    for (const key of ["intro", "introPassed"]) assert.doesNotMatch(String(at(locale, `seasonalPolaroid.flow.screen2.${key}`)), /second|한 장 더/i);
  }
});

test("'What does your pet call you?' no longer offers 'Something else', and 'A name' still takes a typed name", () => {
  assert.deepEqual(HALLOWEEN_POLAROID_THEME.callNames.map((option) => option.id), ["mom", "dad", "both", "sister", "brother", "by-name"]);
  for (const locale of [en, ko]) {
    const labels = at(locale, "seasonalPolaroid.flow.options.callNames") as Record<string, string>;
    assert.equal(labels.custom, undefined);
    assert.equal(typeof labels.byName, "string");
  }
  assert.doesNotMatch(component, /\["by-name", "custom"\]/);
  assert.match(component, /answers\.callName === "by-name" && !answers\.customCallName\.trim\(\)/);
  assert.match(component, /answers\.callName === "by-name" \? <input/);
  // A draft saved while "Something else" existed restores as "A name" with the same typed name.
  assert.match(component, /draft\.callName === "custom" \? "by-name" : draft\.callName/);
});

test("Step 3 uses optional free text for occasion answers and keeps the owner call-name choices", () => {
  assert.doesNotMatch(component, /labelKey: `occasion\.q[12]\./);
  assert.doesNotMatch(component, /seasonalPolaroid\.flow\.occasion\.q[12]/);
  assert.doesNotMatch(component, /theme\.personalities\.map/);
  assert.doesNotMatch(component, /OptionGroup label=\{t\("seasonalPolaroid\.flow\.screen5\.habitLabel"\)/);
  assert.doesNotMatch(component, /favoriteTreat|treatLabel|treatCustomPlaceholder/);
  assert.match(component, /id="seasonal-question-1"[^>]*maxLength=\{MAX_OCCASION_ANSWER_LENGTH\}/);
  assert.match(component, /id="seasonal-question-2"[^>]*maxLength=\{MAX_OCCASION_ANSWER_LENGTH\}/);
  assert.match(component, /replaceAll\("%PET_NAME%", petName\)/);
  assert.doesNotMatch(component, /questionsConfig\.question[12]\.options/);
  assert.doesNotMatch(component, /personalDetail|seasonal-detail|occasionMemoryLabel/);
  assert.match(component, /answers\.callName === "by-name"/);
  assert.match(component, /options=\{theme\.callNames\}/);
  assert.match(component, /occasionQuestion1: ""[\s\S]{0,100}occasionQuestion2: ""/);
  assert.match(component, /const updateOccasion = \(nextOccasionId: string\) => \{[\s\S]*?occasionQuestion1: "",[\s\S]*?occasionQuestion2: "",/);
  assert.match(component, /cleared \|\| !isPreserveOriginal \? undefined : "preserve-original-scene"/);
  assert.match(component, /questionnaireVersion: "occasion-v2"/);
  assert.match(component, /draft\.questionnaireVersion === "occasion-v2"/);
  assert.match(component, /MAX_OCCASION_ANSWER_LENGTH/);
  assert.match(component, /personalities: \[\][\s\S]{0,50}habit: ""[\s\S]{0,50}customHabit: ""/);
  assert.match(route, /occasionQuestion1: optionalRawText\(formData, "occasionQuestion1"\)/);
  assert.match(route, /occasionQuestion2: optionalRawText\(formData, "occasionQuestion2"\)/);
  assert.match(admission, /occasionQuestion1\?: string/);
  assert.match(admission, /occasionQuestion2\?: string/);
  assert.match(admission, /questionnaireVersion\?: "occasion-v1" \| "occasion-v2"/);
  assert.match(admission, /answers\.occasionQuestion1/);
  assert.match(admission, /const request = \{\s*answers: normalizedAnswers\(args\.answers\)/);
  assert.match(admission, /questionnaireVersion\?: "occasion-v1" \| "occasion-v2"/);
  assert.match(admission, /personalDetail\?: string/);
  assert.match(prompts, /answers\.questionnaireVersion === "occasion-v2"/);
  assert.match(prompts, /emotionalContext/);
  assert.match(prompts, /Never quote it, list it, or copy its wording/);
  for (const locale of [en, ko]) {
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.screen6.questionAnswerPlaceholder"), "string");
    assert.equal(typeof at(locale, "seasonalPolaroid.flow.screen6.questionAnswerOptional"), "string");
  }
});
