---
title: Causal Micro-Narratives
type: paper
authors:
  - Mourad Heddaya
  - Qingcheng Zeng
  - Chenhao Tan
  - Rob Voigt
  - Alexander Zentefis
year: null
tags:
  - narrative-classification
  - causal-language
  - text-as-data
  - inflation
  - llm-fine-tuning
---

## TL;DR

The paper defines causal micro-narratives as sentence-level explanations of a target's causes or effects and operationalizes them through an expert-defined inflation ontology. Fine-tuned Llama 3.1 8B achieves binary narrative-detection F1 of 0.87 and multi-label classification micro-F1 of 0.71 on contemporary U.S. news, outperforming few-shot GPT-4o in the reported comparison. Historical-news results are lower, and disagreements about implicit causation limit both human labels and model evaluation. These are measurements of causal claims in text, not evidence that the claimed mechanisms are true.

## Research Question

Can a target-specific cause-and-effect ontology support reliable, scalable detection and classification of causal explanations in news, and how well do the resulting classifiers transfer between historical and contemporary language?

## Motivation

Narratives may shape economic beliefs and decisions, but keyword counts and sentiment scores do not identify which causal explanations a text conveys. The proposed [[concepts/causal-micro-narrative-classification|causal micro-narrative classification]] task separates merely mentioning inflation from attributing causes or consequences to it. In the annotated contemporary and historical samples, respectively, 49% and 47% of keyword-filtered sentences contain no narrative under this definition.

## Contributions

- Defines a sentence-level, target-centered narrative unit and a hierarchical multi-label classification task.
- Constructs an inflation ontology and human-annotated datasets spanning U.S. news from 1960-1980 and 2012-2023.
- Compares few-shot GPT-4o with LoRA fine-tuning of Llama 3.1 8B and Phi-2, including training across and within time periods.
- Relates model errors to human disagreements, especially the boundary between an implicit narrative and a non-narrative.

## Method

An economist constructs the ontology using domain knowledge, web searches, and LLM-assisted exploration (Appendix B). Tables 1 and 6 enumerate eight cause categories and eleven effect categories. Examples distinguish government policy causing inflation (`fiscal`) from inflation affecting government policy or finances (`govt`). A sentence can express several causes and effects. This shares the fixed-category approach of [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]], although the output here is target-relative narrative labels rather than linked entity triples.

Articles are segmented into sentences and filtered for the word "inflation." Three team members annotate the data; all three annotate the test sentences, and majority agreement supplies evaluation labels. Historical test texts longer than 150 words are removed after sentence-segmentation failures, reducing that set from 500 to 488. The results captions state that 14 test instances without a majority annotation are excluded.

GPT-4o receives label definitions and 24 demonstrations: one per cause/effect category plus five non-narratives. It uses greedy decoding without constrained generation; the authors report reliable JSON formatting. Llama 3.1 8B and Phi-2 receive definitions and instructions, with LoRA fine-tuning that applies language-model loss only to label tokens rather than JSON notation. Appendix E reports 600 maximum steps, effective batch size 16, AdamW, learning rate 1e-4, and LoRA rank 16 with alpha 32. Additional JSON fields for time, direction, and foreign context are outside the reported evaluation.

## Experiments

### Data and Annotation

| Dataset | Period | Filtered articles | Filtered sentences | Annotated train / test |
| --- | --- | --- | --- | --- |
| ProQuest historical U.S. news | 1960-1980 | 392,475 | 751,380 | 999 / 488 |
| NOW contemporary U.S. news | 2012-2023 | 118,383 | 284,220 | 1,119 / 201 |

The corpus counts describe available keyword-filtered text, not the size of the human-labeled benchmark. Table 2 reports Krippendorff's alpha with MASI distance weighting: historical binary/multi-label agreement is 0.80/0.66, versus 0.67/0.59 for contemporary news. These are reliability coefficients, not percentages of identical annotations.

### Classification Results

Table 3 reports the following F1 scores. Both fine-tuned models use the combined 2,118 training instances; GPT-4o is a few-shot baseline. Detection uses binary F1, while the category task uses micro-averaged multi-label F1 despite being called "multiclass" in the source.

| Model | Historical detection | Contemporary detection | Historical categories | Contemporary categories |
| --- | --- | --- | --- | --- |
| Fine-tuned Llama 3.1 8B | 0.78 | 0.87 | 0.62 | 0.71 |
| Fine-tuned Phi-2 | 0.83 | 0.79 | 0.60 | 0.65 |
| Few-shot GPT-4o | 0.47 | 0.63 | 0.46 | 0.57 |

Llama leads both category evaluations and contemporary detection; Phi-2 leads historical detection. The open models' zero/few-shot F1 scores are reported as 0.12 or lower, motivating the focus on fine-tuning. The comparison therefore tests different adaptation regimes as well as different models.

### Temporal Transfer and Errors

Table 4 shows category F1 falling by 0.03-0.04 when training switches to the other period while holding the test period fixed. For Llama, historical-test F1 is 0.55 with historical training and 0.52 with contemporary training; contemporary-test F1 is 0.63 with contemporary training and 0.59 with historical training. Combined training raises these to 0.62 and 0.71. Binary transfer is asymmetric: contemporary-only training raises Llama's historical detection F1 from 0.64 to 0.73, while historical-only training lowers contemporary detection from 0.82 to 0.75.

GPT-4o more often assigns narratives to sentences labeled non-narratives. Fine-tuned Llama misses implied social/political consequences, a category also responsible for frequent annotator disagreements. Missing antecedents and ambiguous causal direction can make both model and majority labels contestable. The authors' error analysis supports overlap between model errors and human ambiguity; it does not establish an unambiguous causal ground truth.

## Limitations

- Each new target requires a manually developed ontology. Discovery of previously unspecified narratives is proposed as future work and is not evaluated.
- Evidence covers English-language U.S. news about inflation. Keyword filtering and single-sentence inputs can miss paraphrased targets, cross-sentence explanations, and necessary antecedents. Temporal transfer within this setting does not establish transfer to other topics or languages.
- The benchmark uses a small set of team annotators and majority labels. Micro-F1 pools decisions across labels and can obscure weak performance on rare categories; no confidence intervals or repeated-run variability accompany the main scores.
- The paper motivates studying narrative prevalence and influence but does not estimate effects of narratives on beliefs, behavior, or economic outcomes.
- The supplied text contains reporting inconsistencies: the introduction says 18 classes, whereas the ontology lists 19; Section 5.3 describes micro-averaging broadly, while table captions specify binary F1 for detection; and Table 4's caption reverses the row/column orientation shown by its header. Table 3's GPT-4o values match the corresponding single-period rows in Table 4, not its combined row. The summary above preserves Table 3 as its own comparison and uses Table 4's labeled training rows and test columns for transfer results.

Publication year, venue, and a stable identifier are not supplied in the parsed text; the year is left unknown.

## Related Concepts

- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]
- Human annotation disagreement
- Temporal domain shift

## Related Papers

- Shiller (2017), "Narrative economics": cited motivation for studying economic narratives.
- Ash, Gauthier, and Widmer (2021), "Relatio: Text semantics capture political and economic narratives": cited narrative-extraction approach, discussed through its extension by Lange et al. (2022).
- Andre et al. (2023), "Narratives about the macroeconomy": cited survey and experimental work on household and expert causal narratives.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a library comparison on human validation of text-based measurements; it studies latent positions rather than narrative labels and is not cited by this paper.

[[index|Library home]]
