---
title: Soft Measures for Extracting Causal Collective Intelligence
type: paper
authors:
  - Maryam Berijanian
  - Spencer Dork
  - Kuldeep Singh
  - Michael Riley Millikan
  - Ashlin Riggs
  - Aadarsh Swaminathan
  - Sarah L. Gibbs
  - Scott E. Friedman
  - Nathan Brugnone
year: null
tags:
  - fuzzy-cognitive-maps
  - causal-language
  - graph-evaluation
  - human-validation
  - llm-fine-tuning
---

## TL;DR

The paper fine-tunes LLMs to extract signed causal relations from social-ecological research passages and evaluates the resulting fuzzy cognitive maps with soft edge-based scores. Across 20 passage-level human-ranking tournaments, BLEU-E has the highest mean Spearman correlation with human judgments, 0.415 versus 0.016 for exact-match F1. Allowing partial credit for matching endpoints with the wrong causal sign improves alignment, but the correlations remain modest and the similarity thresholds are selected for agreement with the human rankings being studied. This is a proof of concept for evaluating textual causal models, not a validation of their real-world causal truth.

## Research Question

Can fine-tuned LLMs extract useful fuzzy cognitive maps from text, and can similarity measures that accommodate paraphrases and partially correct edges better reproduce human assessments than exact-match F1?

## Motivation

[[concepts/fuzzy-cognitive-maps|Fuzzy Cognitive Maps]] represent causal mental models as signed, weighted directed graphs. Their nodes are natural-language descriptions of factors, so different annotators may express a similar relationship with different spans. Exact matching penalizes these variations and treats a partially useful edge like an unrelated one. Automating extraction could support synthesis of stakeholder and scientific perspectives, but requires evaluation sensitive to both linguistic variation and causal structure.

## Contributions

- Curates 318 passages from social-ecological research with source, target, and causal-sign annotations.
- Evaluates zero-shot, three-shot, and LoRA-tuned variants of Llama-2-7B-chat-hf, Llama-3-8B-Instruct, and Mistral-7B-Instruct-v0.2.
- Introduces BLEU-E, ROUGE-E, METEOR-E, and BLEURT-E, combining thresholded endpoint similarity with partial credit for sign disagreement.
- Uses pairwise human preferences and passage-specific Elo tournaments to assess agreement between automatic scores and human rankings.

## Method

### Extraction and Training

The [[concepts/causal-text-mining|Causal Text Mining]] task produces `(source, target, direction)` triples, where direction means a positive/increasing or negative/decreasing effect. Source and target order separately encodes which factor affects which. Although FCMs generally include numerical edge weights, this extraction task predicts signs rather than calibrated effect magnitudes. The rater guidelines prioritize text-grounded node names and correct endpoint order, and exclude transitive edges unless explicitly stated in the passage.

The datasheet gives 224 training, 38 validation, and 56 test passages. Fine-tuning uses cross-entropy loss, 4-bit quantization, a learning rate of 2e-4, batch size 4, and at most 15 epochs with early stopping after three epochs without validation improvement. LoRA rank is selected by validation loss from 2 through 256; the selected ranks are 128 for Llama-2, 64 for Llama-3, and 128 for Mistral. Other training hyperparameters are held fixed (Appendix C).

### Soft Edge Scores

For predicted and reference edge sets, a textual similarity function compares source with source and target with target. Both endpoint similarities must meet threshold $T$. A matched edge with the same sign counts as a true positive (TP); matching endpoints with a different sign count as a partial positive (PP). A predicted edge with no endpoint match is a false positive (FP), and a reference edge with no endpoint match is a false negative (FN). The proposed score is

$$
F_{\mathrm{soft}} = \frac{2\,\mathrm{TP}+\mathrm{PP}}{2\,\mathrm{TP}+\mathrm{PP}+\mathrm{FP}+\mathrm{FN}}.
$$

These are existential matching rules; Section 3.3 does not specify a one-to-one assignment of predicted to reference edges. The formula also differs from assigning a fixed half-score to each wrong-sign edge: if only partial positives are present and FP and FN are zero, it evaluates to one. This follows from the stated equation and is relevant when interpreting sign sensitivity.

The [[concepts/soft-edge-based-graph-evaluation|Soft Edge-Based Graph Evaluation]] variants use BLEU, ROUGE-1, METEOR, or `bleurt-base-128` for endpoint comparisons. Exploratory analysis and adaptive grid search select thresholds to maximize Spearman correlation with human rankings: 0.352, 0.45, 0.01, and -0.1532, respectively (Appendix D.3).

### Human Benchmark

Twenty selected passages receive multiple human and LLM annotations. The appendices describe seven human annotators/raters; the main text more broadly says all authors annotated them. Raters choose a preferred annotation or a tie, excluding their own annotations. Each passage forms a separate Elo tournament, initialized at 1000 with a K-factor of 32. Its winning annotation becomes the reference against which automatic scores rank the other annotations. Spearman correlations between human and automatic rankings are then averaged across passages.

## Experiments

### Agreement With Human Rankings

Table 3 reports the following mean Spearman correlations. The final column removes partial positives while retaining the corresponding textual similarity measure.

| Measure | Mean correlation | 95% confidence interval | Mean without partial positives |
| --- | ---: | --- | ---: |
| Exact-match F1 | 0.016 | (-0.072, 0.104) | 0.016 |
| BLEU-E | 0.415 | (0.223, 0.607) | 0.109 |
| ROUGE-E | 0.387 | (0.166, 0.608) | 0.124 |
| BLEURT-E | 0.338 | (0.144, 0.532) | 0.152 |
| METEOR-E | 0.333 | (0.106, 0.559) | 0.126 |

All four partial-positive variants have positive 95% intervals, and Table 4 reports positive 95% intervals for their paired improvements over F1. BLEU-E's mean paired improvement is 0.399, with interval (0.234, 0.564). BLEU-E has the largest point estimate, but the paper does not establish that it significantly outperforms the other soft measures. Without partial positives, only BLEURT-E's 95% interval excludes zero.

### Model Extraction and Rater Reliability

Section 4.2 reports that fine-tuning improves BLEU-E for all three models, with fine-tuned Mistral ranking above Llama-2 and Llama-3, consistent with the human comparison. Exact bar heights from Figure 2 are not supplied as text and are not reconstructed here. Similar validation losses therefore do not imply similar extraction quality in the reported comparison.

Appendix H.1 reports that at least 71.4% of raters agree on 90% of the evaluated samples and that raters have 90.5% self-consistency. These are reported agreement proportions, not chance-corrected reliability coefficients.

## Limitations

- The corpus is small and drawn from social-ecological topics relevant to the research team. The 20 ranking passages emphasize difficult examples, limiting generalization to typical passages, other domains, and other annotator populations.
- Human annotations, rating guidelines, and tournament winners define the evaluation target. The winning reference is itself selected from the compared annotations, and agreement with it does not establish a unique correct graph or factual causal validity.
- Thresholds are optimized against human rankings; the supplied text does not describe an independent held-out evaluation of that threshold selection. Reported correlations should be read as alignment within this study.
- The scores still show limited agreement with human judgment. Their endpoint thresholds, existential matching, and partial-positive formula need scrutiny before use as general graph-quality measures.
- Only LoRA rank is optimized. The model ordering is specific to these training choices and this dataset, and exact model-score magnitudes are unavailable in the parsed text.
- Appendix D.1 asserts that Elo rankings are invariant to game order, initialization, and K-factor, but supplies no supporting derivation or sensitivity experiment. The reported ranking protocol should not be treated as evidence of that invariance.
- Human-in-the-loop refinement, knowledge-hypergraph extensions, and downstream collective-intelligence applications are proposed rather than evaluated. Dataset release is promised in the datasheet; no usable code or dataset repository link is present in the supplied Markdown.

Publication year, venue, and a stable identifier are absent from the supplied text; the year is left unknown.

## Related Concepts

- [[concepts/fuzzy-cognitive-maps|Fuzzy Cognitive Maps]]
- [[concepts/soft-edge-based-graph-evaluation|Soft Edge-Based Graph Evaluation]]
- [[concepts/causal-text-mining|Causal Text Mining]]

## Related Papers

- Kosko (1986), "Fuzzy cognitive maps": cited foundation for the graph representation.
- Boubdir et al. (2023), "Elo uncovered: Robustness and best practices in language model evaluation": cited background on using Elo for model evaluation.
- Aminpour et al. (2020), "Wisdom of stakeholder crowds in complex social-ecological systems": cited motivation for collective-intelligence modeling.
- [[papers/politicause-an-annotation-scheme-and-corpus-for-causality-in-political-texts|PolitiCause: An Annotation Scheme and Corpus for Causality in Political Texts]]: library comparison, not a citation in this paper; annotates causal claims and spans in political text, but benchmarks sentence classification rather than signed graph extraction.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: library comparison, not a citation in this paper; similarly uses human judgments to validate text-derived measurements, with latent positions rather than graph edges as its target.

[[index|Library home]]
