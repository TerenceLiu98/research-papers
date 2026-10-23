---
title: "Position: Universal Aesthetic Alignment Narrows Artistic Expression"
type: paper
authors:
  - Wenqi Marshall Guo
  - Qingyun Qian
  - Khalad Hasan
  - Shan Du
year: null
source_job_id: 4ade43dc-3e29-41a3-bf24-01354803a850
tags:
  - aesthetic-alignment
  - text-to-image-generation
  - reward-modeling
  - instruction-following
  - user-autonomy
---

## TL;DR

This position paper argues that optimizing text-to-image systems for a generalized aesthetic preference can conflict with explicit requests for unconventional, degraded, or emotionally negative imagery. On 300 COCO-derived prompt pairs spanning 12 aesthetic dimensions, preference-aligned generators generally follow these "wide-spectrum aesthetics" instructions less faithfully than their base models, while several aesthetic reward models prefer conventionally polished images even under prompts requesting the opposite. HPSv3 selects the prompt-faithful wide-spectrum image with 38.1% accuracy, compared with 91.3% for CLIP-L and 96.5% for BLIP-L. Tests on edited emotional images, professional photography, and about 10,000 paintings extend the observed scoring bias beyond synthetic benchmark pairs. The authors interpret these results as evidence that universal aesthetic optimization can narrow expressive agency, though the experiments do not establish how representative the prompts, models, or stated preferences are of users in deployment.

## Research Question

When a user's explicit text-to-image instruction conflicts with a model's learned preference for conventionally appealing imagery, do generation and reward models prioritize prompt adherence or generalized aesthetic quality?

## Motivation

Image-generation alignment commonly combines instruction following with reward signals intended to improve average aesthetic appeal. These objectives need not agree. A user may deliberately request blur, clashing colors, unrealistic scale, negative emotion, or another style that a preference model has learned to penalize. The paper calls such intentional departures from dominant conventions "wide-spectrum aesthetics" and distinguishes them from accidental generation failures or unsafe content. It frames the conflict as both a technical controllability problem and a normative issue involving aesthetic pluralism, developer influence, and user autonomy.

## Contributions

- Defines a benchmark setting in which original prompts are transformed to request 2-4 deliberately non-mainstream aesthetic properties, enabling direct comparison between ordinary quality and instruction adherence.
- Compares base, preference-aligned, and instruction-aligned variants from the Flux, SDXL, and Stable Diffusion 3.5 families, plus Nano Banana.
- Evaluates seven reward or image-text scoring models and a fine-tuned, dimension-level judge, separating prompt matching from generalized aesthetic scoring.
- Adds controlled negative-emotion edits and generation tests, then evaluates deliberately anti-aesthetic professional photographs and real paintings.
- Advances the position that optimizing for an aggregate preference can produce "reversed alignment," in which the system pressures the user's request toward the encoded collective norm.

## Method

### Wide-spectrum prompt construction

The authors sample 300 COCO captions. For each caption they select 2-4 of 12 aesthetic dimensions derived from VisionReward's low-rating descriptions, then use Qwen3-VL-235B-A22B-Instruct to rewrite the caption with the requested effects. This produces an original prompt $p_o$ and a wide-spectrum prompt $p_a$.

Each image generator produces one image from each prompt, denoted $I_o$ and $I_a$. The evaluated families include Flux Dev, DanceFlux, PrefFlux, Flux Krea, SDXL, Playground 2.5, Stable Diffusion 3.5 Medium and two aligned variants, and Nano Banana. Pairwise success means that a judge selects $I_a$ as better matching $p_a$ than $I_o$.

### Reward-model evaluation

The reward-model panel comprises PickScore, ImageReward, HPS/HPSv2.1/HPSv3, MPS, CLIP-L, and BLIP-L. Scores conditioned on both $p_o$ and $p_a$ distinguish ordinary image quality from recognition of the requested unconventional style. A Qwen3-VL-4B model fine-tuned on VisionReward supplies prompt-independent per-dimension judgments. Qwen3-VL-235B chooses the pairwise ground truth for prompt adherence; a human evaluation reports quadratic Cohen's $\kappa=0.80$, and GPT-5-Chat serves as an additional comparison.

### Targeted and real-image tests

For emotional bias, Nano Banana edits happy source images into sad, angry, and fearful versions while aiming to preserve other content. A separate set instantiates 30 neutral face prompts with four emotions and evaluates six generators using BLIP on detected face crops.

For photography, an agentic retrieval and filtering workflow selects 2,928 deliberately anti-aesthetic images from AVA and creates style-aware and clean captions. Z-Image Turbo generates a clean comparison image from each clean caption; both images are scored under the anti-aesthetic prompt. For artwork, about 10,000 LAPIS paintings are captioned with Qwen3-VL-30B-A3B-Instruct and scored by HPSv3, with BLIP used to test image-caption correspondence.

## Experiments

### Reward models

Under the wide-spectrum prompt, HPSv3 selects the prompt-faithful image with 38.1% accuracy and 0.385 AUROC. HPSv2.1 reaches 56.5% accuracy, ImageReward 76.2%, PickScore 85.1%, and MPS 70.6%. The non-preference-aligned image-text models perform better: CLIP-L reaches 91.3% accuracy and BLIP-L 96.5%. GPT-5-Chat reaches 85.3%. The authors take the base-model advantage as evidence that the failures are not explained solely by inability to parse the prompts.

### Image generators

Within several model families, stronger generalized preference alignment corresponds to smaller changes toward the requested wide-spectrum attributes. DanceFlux's HPSv3 difference between its wide-spectrum and original images is -1.105, versus -3.165 for Flux Dev and -4.372 for Flux Krea; its BLIP score is also the lowest among the reported generators at 0.813. Playground and the PickScore-aligned SD3.5M variant similarly preserve higher conventional-aesthetic scores than their base models when asked to deviate. Nano Banana shows the largest HPSv3 change (-9.351) while retaining a BLIP score of 0.957. Wilcoxon and McNemar tests comparing aligned variants with their bases are mostly reported below $10^{-5}$, although the SD3.5M-PickScore success-count comparison is not significant ($p=0.57$).

### Emotion, photography, and art

On controlled negative-emotion image pairs, HPSv3 selects the requested anger, fear, and sadness images with accuracies of 0.19, 0.32, and 0.44; BLIP reaches 0.96, 0.79, and 0.95. In generation, DanceFlux's BLIP target-emotion scores are 0.27 for anger, 0.33 for fear, 0.36 for sadness, and 0.61 for happiness, whereas several less strongly aesthetic-aligned models perform better on negative emotions.

For the curated AVA photographs, HPSv3 scores clean generated comparisons 5.90 points above the requested anti-aesthetic photographs on average, with a 13.2-point gap for analog degradation. Across roughly 10,000 LAPIS paintings, the mean raw HPSv3 score is 5.86, which the paper places tenth among twelve systems on the August 2025 HPSv3 leaderboard. BLIP image-caption matching is 0.996 and falls to 0.086 after shuffling, suggesting that weak semantic correspondence is not sufficient to explain the low aesthetic scores.

## Limitations

- The work is a position paper: terms such as "aesthetic authoritarianism" and "reversed alignment" are interpretations of the observed behavior, not independently measured constructs.
- The 300 benchmark prompts begin with COCO captions and use dimensions and low-rating descriptions from VisionReward. Results may change with user-written prompts, other cultures, other notions of aesthetic value, or different prompt transformations.
- Pairwise ground truth relies primarily on a large vision-language model. Human agreement is reported on a validation exercise, but the supplied text does not specify enough sampling detail to establish that every benchmark judgment generalizes to diverse users.
- Generator comparisons differ in architecture, training objective, starting checkpoint, and accessibility. Within-family contrasts are more informative than treating the full table as a controlled ranking of alignment methods.
- Several evaluation models share training traditions or backbones, and scalar score differences are not necessarily comparable across reward-model families.
- The AVA curation pipeline uses multiple learned retrieval, captioning, and judging systems, which can introduce selection and labeling biases. The real-art analysis uses generated captions and a leaderboard comparison rather than direct artist- or viewer-specific preferences.
- The experiments show conflict for deliberate non-mainstream prompts; they do not quantify how frequently that conflict occurs in ordinary deployment or establish that generalized aesthetic defaults are undesirable when users leave style unspecified.
- The supplied Markdown does not state a publication year, venue acceptance status, DOI, or arXiv identifier, so those metadata remain unasserted.

## Related Concepts

- [[concepts/aesthetic-preference-alignment|Aesthetic Preference Alignment]]: the central trade-off between generalized appeal and explicit aesthetic intent.
- [[concepts/model-steerability|Model Steerability]]: prompt adherence here is a behavioral form of controllability across aesthetic dimensions.
- [[concepts/diffusion-models|Diffusion Models]]: most evaluated open generators are diffusion or flow-based image models.
- [[concepts/distributional-reward-modeling|Distributional Reward Modeling]]: preserving preference variation is a related alternative to collapsing judgments into one aggregate score.
- [[concepts/computational-visual-semiotics|Computational Visual Semiotics]]: provides a complementary account of aesthetic effects as situated meaning rather than beauty alone.

## Related Papers

- Ma et al. (2025), "HPSv3: Towards Wide-Spectrum Human Preference Score": supplies a central reward model and motivates analysis of preference variance, but remains a generalized scorer in this paper's critique.
- Xu et al. (2025), "VisionReward: Fine-Grained Multi-Dimensional Human Preference Learning for Image and Video Generation": supplies the aesthetic dimensions used for prompt construction and judge training.
- Guo and Du (2025), "VSF: Simple, Efficient, and Effective Negative Guidance in Few-Step Image Generation Models By Value Sign Flip": an earlier pilot on negative guidance by two of the authors.
- Helliwell (2024), "Aesthetic Value and the AI Alignment Problem": develops the philosophical case for limiting full aesthetic alignment.
- Taylor et al. (2026), "The Algorithmic Gaze: An Audit and Ethnography of the LAION-Aesthetics Predictor Model": a concurrent critique of prescriptive aesthetic measurement.
- [[papers/difusion-reward-models|Difusion Reward Models]]: models distributions of judgments rather than only a scalar mean, offering a related technical response to heterogeneous preferences.
- [[papers/impressions-understanding-visual-semiotics-and-aesthetic-impact|Impressions: Understanding Visual Semiotics and Aesthetic Impact]]: treats aesthetic impact as audience interpretation and communicative force rather than beauty alone.

[[index|Library home]]
