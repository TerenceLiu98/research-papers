---
title: "Evaluating Large Vision-Language Models for Visual Framing Analysis in News Imagery: A Theory-Driven Benchmark"
type: paper
authors:
  - Linqi Lu
  - Jiwon Kang
  - Zihan Wan
  - Laila Abbas
  - Hyerin Kwon
  - Sang Jung Kim
  - Jiawei Liu
  - Douglas M. McLeod
year: null
tags:
  - visual-framing
  - vision-language-models
  - computational-communication
  - multimodal-evaluation
---

## TL;DR

This paper benchmarks five large vision-language models on human-coded news images of social movements. A theory-guided prompt decomposes images into actors, actions, objects, environments, and relationships before classifying conflict, peace, protester solidarity, and police solidarity. Chain-of-thought prompts often improve F1, especially for solidarity frames, but gains vary by model, frame, and prompt: no single prompt level dominates every condition. InternVL3-38B is the strongest overall model in the authors' comparison.

## Research Question

How closely can large vision-language models reproduce expert visual-frame annotations, and how do baseline, simple, detailed, and expert chain-of-thought prompts affect performance across conflict, peace, protester-solidarity, and police-solidarity frames?

## Motivation

News images can foreground conflict, peace, or group solidarity and thereby shape interpretations of social movements. Manual visual content analysis preserves contextual and symbolic meaning but is difficult to scale. Conventional computer-vision systems can detect objects or scenes, yet visual framing also depends on relational, connotative, and culturally specific cues. The paper therefore studies whether theory-guided LVLM prompts can connect low-level visual observations to higher-order frames while remaining aligned with human coding.

## Contributions

- Develops a visual-analysis framework linking 79 coded elements across actors, actions, objects, environments, and relationships to four social-movement frames.
- Compares Gemma3-27B, GPT-4.1, InternVL3-14B, InternVL3-38B, and Qwen2.5-VL-72B against expert annotations.
- Tests baseline and three increasingly elaborate chain-of-thought prompts with repeated inference, majority voting, and bootstrap confidence intervals.
- Applies the selected InternVL3-38B model to 8,979 images and relates 77 binary visual indicators to framing labels using logistic regression and random forests.

## Method

### Corpus and Human Coding

The authors retrieve 48,135 filtered articles published from January 2018 through March 1, 2025 across 13 U.S. news outlets. The articles concern Black Lives Matter, far-right mobilizations, anti-war movements, and Antifa. Image retrieval produces 8,979 high-resolution images linked to article metadata.

Three trained annotators first code a random sample of 200 images for article and headline relevance, obtaining Krippendorff's $\alpha=.91$. They then code a separate random sample of 200 images for conflict, peace, protester solidarity, and police solidarity. Mean agreement across these four frames is $\alpha=.86$; disagreements are resolved through discussion. The codebook also contains 79 visual elements and intensity measures derived from visual-framing theory, social semiotics, and scene understanding.

### Model Benchmark

The standardized prompt first asks a model to identify mostly denotative and semiotic elements, then infer the four higher-order frames and return JSON with Boolean labels and supporting elements. Predictions from five LVLMs are compared with the human-coded frame labels using precision, recall, F1, and Cohen's kappa.

The prompt experiment adds simple, detailed, and expert chain-of-thought conditions. These progress from salient observations to emotional, symbolic, spatial, hierarchical, and power-relational analysis. Each model-prompt combination is run three times with separate random seeds; majority voting yields one prediction set, and 2,000 bootstrap iterations provide F1 confidence intervals. The supplied text says open-source models run on two 48 GB NVIDIA RTX 6000 Ada GPUs.

### Full-Corpus Indicator Analysis

After selecting InternVL3-38B, the authors analyze all 8,979 images using 77 binary indicators. Logistic regression and random forests, each evaluated with 1,000 stratified bootstrap resamples, identify visual elements associated with each frame. These associations characterize model-produced labels and should not be read as causal effects of visual elements.

## Experiments

**Baseline comparison.** InternVL3-38B records the reported leading baseline scores for conflict ($F1=.92$, $\kappa=.87$), peace ($F1=.84$, $\kappa=.70$), and protester solidarity ($F1=.87$, $\kappa=.78$). Qwen2.5-VL-72B leads police solidarity ($F1=.88$, $\kappa=.84$). The prose and bootstrap table differ slightly for some baseline values, so these figures reproduce the narrative in Section 3.4.

**Prompt effects.** Improvements are largest in several initially weak solidarity conditions. GPT-4.1 protester-solidarity F1 rises from 0.63 [0.53, 0.72] to 0.91 [0.86, 0.95] under simple CoT. InternVL3-14B police-solidarity F1 rises from 0.48 [0.33, 0.63] to 0.92 [0.86, 0.97] under expert CoT, while InternVL3-38B rises from 0.55 [0.39, 0.68] to 0.93 [0.86, 0.97] under detailed CoT. Effects are not uniformly positive: InternVL3-38B protester-solidarity F1 falls from 0.87 at baseline to 0.84 in every CoT condition, and several conflict and peace settings are flat or lower under more elaborate prompts.

**Run-to-run reliability.** Across five models and four prompt conditions, median Krippendorff's alpha over three runs exceeds .80, and every reported alpha exceeds .60. The supplied Markdown does not provide the individual coefficients or uncertainty intervals.

**Visual indicators.** Logistic regression associates conflict labels most strongly with tense protester emotions (OR 39.61 [9.77, 136.98]), smoke or fire (37.39 [9.56, 135.35]), and property damage (36.95 [6.02, 147.25]). Peace is dominated by peaceful gatherings (375.59 [254.29, 560.10]). Comforting or hugging is the largest reported protester-solidarity association (39.62 [18.35, 83.40]), while calm police emotion leads police solidarity (21.93 [8.38, 61.53]). Random-forest importance rankings broadly emphasize the same families of cues, although their importance values are not directly comparable to odds ratios.

## Limitations

- The gold-standard frame benchmark contains only 200 images from four movement families and U.S. news sources. It does not establish performance across other events, media systems, or cultural interpretations.
- Prompt conditions differ in the amount and structure of guidance, so the experiment identifies prompt-package effects rather than a mechanism unique to chain-of-thought reasoning.
- Majority voting across three stochastic runs changes the evaluated predictor relative to a single API call. Reliability is reported across repeated runs, but the source does not supply every coefficient.
- The paper reports heterogeneous prompt effects despite broader prose claiming that expert prompts consistently outperform simpler prompts. Several table entries show baseline or simple prompts performing as well as or better than expert prompts.
- Human consensus is treated as ground truth, but visual frames can be polysemous and culturally specific. Agreement and consensus do not eliminate construct-validity questions.
- The coding framework emphasizes observable denotative and semiotic cues and, as the authors note, cannot fully capture connotative or metaphorical meaning without additional instruction.
- The supplied Markdown does not state a publication year, venue, DOI, or arXiv identifier. It also alternates between 79 coded elements in the benchmark framework and 77 binary predictors in the full-corpus analysis without explaining the reduction.

## Related Concepts

- [[concepts/automated-visual-framing-analysis|Automated Visual Framing Analysis]]
- [[concepts/computational-visual-semiotics|Computational Visual Semiotics]]
- [[concepts/early-fusion-vision-language-models|Early Fusion Vision-Language Models]]

## Related Papers

- Rodriguez and Dimitrova (2011), "The Levels of Visual Framing": supplies the four-tier framing model used to connect denotative and semiotic observations to connotative and ideological interpretation.
- Araujo, Lock, and van de Velde (2020), "Automated Visual Content Analysis (AVCA) in Communication Research": motivates human validation in scalable image classification.
- Lu et al. (2025), "Visual Constructs of Conflict and Solidarity": supports the four-frame social-movement codebook.
- [[papers/for-a-semiotic-ai-bridging-computer-vision-and-visual-semiotics-for-computational-observation-of-large-scale-facial-image-archives|For a Semiotic AI]]: related Wiki reading on operationalizing multilevel visual meaning with computer vision.

[[index|Library home]]
