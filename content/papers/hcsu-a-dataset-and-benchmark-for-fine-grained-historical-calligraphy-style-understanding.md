---
title: "HCSU: A Dataset and Benchmark for Fine-Grained Historical Calligraphy Style Understanding"
type: paper
authors:
  - Yinsheng Yao
  - Yan Liu
  - Chen Ye
year: null
source_job_id: 44b37484-eaa8-42b0-a463-5d0a4493310e
previous_source_job_id: 0c6d36ad-4f4d-49ab-acac-455e65adf7c1
tags:
  - historical-calligraphy
  - fine-grained-visual-recognition
  - vision-language-models
  - multimodal-benchmarks
  - cultural-heritage
---

## TL;DR

HCSU is a benchmark for [[concepts/historical-calligraphy-style-understanding|Historical Calligraphy Style Understanding]] with 39,307 character images from 49 calligraphers across 10 dynasties. It separates processed ink manuscripts (Tie), processed stone rubbings (Bei), and unconstrained raw images (Wild), and pairs author and script labels with expert descriptions of brushwork, ink, structure, charm, and layout. Nine large vision-language models perform above the 12.5% random baseline on 8-way style discrimination but remain far from reliable: the best reported average accuracy is 37.29%, and strong description generation does not consistently imply strong visual discrimination.

## Research Question

Can large vision-language models distinguish an authorial calligraphic style across different character identities and explain that style using visually grounded, expert-level aesthetic attributes rather than textual, script-level, or source-specific shortcuts?

## Motivation

Chinese calligraphy reverses a common fine-grained recognition setup: the same character can look different across calligraphers, while one calligrapher's signature must be recognized across characters with different structures and stroke counts. Existing handwriting and calligraphy datasets often mix ink manuscripts with stone inscriptions or rubbings, even though those media preserve different evidence, and usually provide flattened identity labels without intermediate aesthetic attributes. This makes it difficult to test whether a model actually perceives brushwork or merely exploits character, script, background, or source cues.

## Contributions

- Introduces HCSU, containing 39,307 images, 49 calligraphers, 78 calligrapher-style pairs, 10 dynasties, and five major script types.
- Separates 3,780 processed Tie images, 3,240 processed Bei images, and 32,287 unconstrained Wild images instead of treating their physical media as interchangeable.
- Provides hierarchical metadata and expert-written descriptions covering character identity, calligrapher, dynasty, source, quality, script, stroke style, ink style, character structure, overall charm, and layout.
- Defines an 8-way style-discrimination task, a 2-shot aesthetic-description task, and robustness and description ablations.
- Benchmarks five proprietary and four open-weight LVLMs, exposing differences among discrimination, verbal articulation, model scale, and sensitivity to image medium.

## Method

The authors begin with 371,669 images from the Yiguan Calligraphy archive, manually screen them for completeness and noise, and select historically prominent calligraphers with recognizable styles. The final dataset contains a processed evaluation core and a larger Wild domain.

For Tie and Bei, the processing pipeline standardizes foreground polarity, applies Otsu thresholding, corrects dark-background metadata errors with a corner-intensity heuristic, pads images to a square without changing aspect ratio, and resizes them to 256 x 256 pixels. Connected-component filtering produces a semantic mask that is applied to the original RGB image so that stroke color and texture can be retained against a white background. The Wild subset retains unconstrained source imagery to permit robustness comparisons.

The 8-way discrimination protocol presents one target image and eight candidates, each with a reference image and style description. The aesthetic-reasoning protocol asks for a description of at most 50 words using two examples whose character identities differ from the target. Generation is evaluated with BERTScore-F1 multiplied by 10 and DeepSeek-chat judgments of professional terminology and detail richness. Robustness tests compare raw Wild, resized Wild, and processed data; description ablations substitute random or GPT-generated text for expert descriptions.

The manuscript links the [HCSU dataset release](https://huggingface.co/datasets/Tongji209/HCSU), including processed Bei and Tie images, per-image JSON annotations, and preview samples. It describes Wild as encrypted multipart archives with access requested from the corresponding author; processed-archive passwords are supplied in the repository README.

## Experiments

Across the nine evaluated LVLMs, 8-way discrimination accuracy ranges from about 19% to 38%. Doubao-1.5-Vision-Pro-250328 leads the reported average at 37.29%, followed by GPT-5.2 at 34.58%. Qwen3-VL-235B-Instruct is the strongest open-weight model at 30.25%, compared with 21.81% for its 30B counterpart; Qwen2.5-VL similarly rises from 20.25% at 7B to 24.93% at 72B.

Most strong models perform better on high-contrast Bei images than on Tie images that preserve continuous ink textures. Qwen3-VL-235B-Instruct, for example, reaches 34.10% accuracy on Bei and 26.40% on Tie. The authors interpret this as possible sensitivity to geometric boundaries, but the experiment does not isolate architecture from training data, OCR behavior, or cultural-domain exposure.

Generation results reveal a separate capability. GPT-5.2 receives the highest terminology and richness judgments, exceeding the expert-reference averages on both measures, while the discrimination-leading Doubao model falls well below expert richness. BERTScores are comparatively compressed across models. These results show that fluent aesthetic vocabulary and discriminative perception need not track one another; they do not establish that scores above the expert average reflect superior visual grounding.

Table 2 averages Bei and Tie accuracies equally, whereas Table 4 weights them by subset size. Thus, Qwen3-VL-235B’s 30.25% main-table average and 29.95% processed robustness accuracy use different aggregation rules.

Raw Wild images produce the highest probe-model discrimination accuracy at 34.22%, compared with 31.40% for Wild-Resize and 29.95% for processed data. The retained resolution and context may contain genuine brushwork evidence or spurious cues such as seals, borders, paper texture, and source artifacts. Expert descriptions help most on Bei accuracy and precision, but GPT-generated descriptions slightly exceed them on Tie accuracy and F1, so expert text is not a universal accuracy booster.

## Limitations

- Script frequencies are imbalanced despite coverage of seal, clerical, regular, semi-cursive, and cursive writing.
- Some Tie images come from copybooks or character dictionaries rather than high-fidelity manuscript reproductions, weakening the ink cues central to the benchmark's motivation.
- Forty-nine prominent calligraphers do not represent the full diversity of Chinese calligraphy or its style lineages.
- Canonicalization removes background confounds but can also remove resolution and texture evidence; stronger Wild results cannot distinguish useful context from shortcuts.
- The LLM-as-a-judge metrics measure terminology and richness, not whether every generated aesthetic claim is supported by the target image.
- Model comparisons mix proprietary and open-weight systems with different architectures, training data, and OCR capabilities, so the results do not identify a single cause of failure.
- The supplied manuscript states no publication year, venue, DOI, or arXiv identifier; those metadata are therefore not inferred here.

## Related Concepts

- [[concepts/historical-calligraphy-style-understanding|Historical Calligraphy Style Understanding]]
- [[concepts/computational-visual-semiotics|Computational Visual Semiotics]]
- [[concepts/automated-visual-framing-analysis|Automated Visual Framing Analysis]]
- Fine-grained visual recognition
- Multimodal benchmark design

## Related Papers

- Luo et al. (2025), "CalliReader: Contextualizing Chinese Calligraphy via an Embedding-Aligned Vision-Language Model": aligns calligraphy images with contextual language representations but does not provide HCSU's dual perception-and-reasoning protocol.
- Zhao, Zhang, and Jin (2025), "MCCD: A Multi-Attribute Chinese Calligraphy Character Dataset Annotated with Script Styles, Dynasties, and Calligraphers": supplies multi-attribute labels but lacks preserved ink-color evidence and expert descriptions in HCSU's comparison.
- [[papers/impressions-understanding-visual-semiotics-and-aesthetic-impact|Impressions: Understanding Visual Semiotics and Aesthetic Impact]]: similarly connects visible form to generated aesthetic language, but studies viewer impressions in photography rather than authorial calligraphy style.
- [[papers/evaluating-large-vision-language-models-for-visual-framing-analysis-in-news-imagery-a-theory-driven-benchmark|Evaluating Large Vision-Language Models for Visual Framing Analysis in News Imagery]]: another expert-grounded LVLM benchmark that maps low-level visual evidence to higher-order judgments.

[[index|Library home]]
