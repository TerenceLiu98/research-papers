---
title: "Interpretable Discriminative Text Representations via Agreement and Label Disentanglement"
type: paper
authors:
  - Tong Wang
  - Yiqing Xu
  - Leo Yang
year: null
tags:
  - interpretable-machine-learning
  - text-classification
  - concept-bottleneck-models
  - feature-discovery
---

## TL;DR

LLM-assisted Feature Discovery (LFD) builds named text features by proposing contrastive rules, checking whether independent LLMs can apply them consistently, and retaining features that improve held-out prediction. Across ten tasks, reported mean balanced accuracy is 0.708 versus 0.707 for Text Bottleneck Models (TBM), with better human agreement and less perceived label leakage. These results support an operational auditability criterion, but cross-LLM agreement overstates human agreement on the audited semantic features and does not establish general construct validity.

## Research Question

Can discriminative text representations expose features that independent annotators can reproduce and that contribute information without simply restating the prediction target?

## Motivation

Anonymous embeddings can predict well without exposing readable coordinates. Named concepts in [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] provide an inspection interface, but a plausible name need not yield reproducible annotations or a meaningful decomposition of the label. The paper proposes evaluating feature definitions before selection through [[concepts/agreement-tested-text-features|agreement-tested text features]], complemented by a separate check for label entanglement.

## Contributions

- Defines conceptual clarity through chance-adjusted inter-rater agreement and label disentanglement through a bound on absolute feature-label Pearson correlation.
- Introduces lexical and semantic proposal lanes, independent annotation checks, and residual predictive-gain selection.
- Gives a stylized per-feature annotation-noise argument for an agreement threshold, subject to equal symmetric error rates and conditional independence.
- Compares ten classification tasks and reports human audits involving 38 disentanglement raters and 194 clarity raters.

## Method

A feature consists of a binary labeling function and a natural-language operational definition. The proposed criteria are $\kappa(f)\geq\kappa^*$ between independent annotators and $|\rho(f,y)|\leq\tau$ on held-out data. Experiments use $\kappa^*=0.70$ and **disable the disentanglement gate with $\tau=1$** to test whether the discovery procedure produces low entanglement without explicit filtering (Sections 3.1 and 4.2).

1. Bootstrap proposals from two groups with opposite labels. After gains stall, propose from outcome-opposed pairs matched within a mid-range similarity band, using TF-IDF for lexical features and embeddings for semantic features.
2. Generate deterministic regex rules in the lexical lane and stepwise reading-comprehension codebooks in the semantic lane. A diversity prompt targets positive-class subgroups not covered by accepted features.
3. Have a labeler and an examiner independently apply the same definition. Reject semantic candidates with Cohen's $\kappa<0.70$. Running identical regexes gives identical outputs by construction, so that lane's agreement does not independently test human understanding.
4. Select candidates by incremental held-out balanced accuracy, using LightGBM by default. Residual selection seeks signal beyond accepted features; stop when no candidate clears the gain threshold and prune features whose removal leaves validation accuracy unchanged.

The reported stack uses Grok-4-fast-reasoning for proposals, gpt-4o-mini for labeling, DeepSeek-chat for examination, and text-embedding-3-large embeddings, with LLM temperature zero. TBM uses gpt-4o-mini for both concept generation and measurement.

Section 3.3 reports the stylized bound $\bar\eta\leq(1-\sqrt{\kappa^*})/2$ and an idealized noise-inflation factor of about 1.20 at the chosen threshold. The manuscript itself limits the interpretation to coordinate-level reliability rather than a tight multivariate covariate-noise guarantee; dependent errors across features and the downstream classifier require further treatment.

## Experiments

The benchmark uses balanced 1,000-example subsets for ten tasks from seven corpora: AdParaphrase, Loan Application, CFPB Complaints, deceptive reviews, Gaslighting, iSarcasm, and four AG News one-versus-rest tasks. Loan Application is proprietary. Table 2 reports a single split per task; its five-seed check retrains classifiers on fixed features and does not rerun discovery.

| Task | LFD features | LFD balanced accuracy | TBM balanced accuracy |
| --- | ---: | ---: | ---: |
| AdParaphrase | 22 | 0.665 | 0.540 |
| Loan Application | 3 | 0.775 | 0.700 |
| AG News Sci/Tech | 26 | 0.855 | 0.835 |
| Gaslighting | 17 | 0.605 | 0.530 |
| AG News Sports | 33 | 0.885 | 0.980 |
| AG News World | 23 | 0.810 | 0.830 |
| AG News Business | 20 | 0.750 | 0.795 |
| CFPB | 21 | 0.565 | 0.550 |
| iSarcasm | 15 | 0.575 | 0.705 |
| Deceptive reviews | 22 | 0.600 | 0.605 |
| Reported mean | | 0.708 | 0.707 |

LFD and TBM split task-level wins 5-5. Anonymous baselines perform better on average: sparse probing reaches 0.790 and full embeddings 0.782. LFD uses a median 21.5 features versus TBM's six; rank-matched baselines use LFD's feature count, while TBM retains its own count.

With the disentanglement gate inactive, the paper reports a maximum absolute feature-label correlation of 0.59 for LFD; TBM exceeds 0.60 on all four AG News tasks. Thirty-eight human raters assess definitions across all ten tasks on a five-point leakage rubric, with higher mean scores for LFD on every task (Section 4.2).

The clarity audit covers only iSarcasm and AG News Sci/Tech, using 194 raters, at least three per feature, and 25 instances per feature. Table 3 reports:

| Task | Agreement | LFD mean $\kappa$ | TBM mean $\kappa$ |
| --- | --- | ---: | ---: |
| iSarcasm | Human-human | 0.69 | 0.27 |
| iSarcasm | Human-LLM | 0.99 | 0.26 |
| AG News Sci/Tech | Human-human | 0.68 | 0.45 |
| AG News Sci/Tech | Human-LLM | 0.84 | 0.43 |

Human-human values average pairwise agreement; human-LLM values compare pipeline labels with human-majority labels. These aggregation schemes differ. On the five sufficiently rated LFD semantic features in Sci/Tech, cross-LLM agreement averages 0.75 while human-human agreement is 0.39. This subset result qualifies the stronger aggregate audit numbers and the annotation-noise assumptions (Section 4.3).

## Limitations

- The named representation loses predictive signal on compositionally difficult tasks such as sarcasm and deceptive reviews. Similar mean accuracy to TBM is a point-estimate comparison, not an equivalence test.
- Cross-vendor models can share annotation errors. Agreement is evidence of reproducibility, not proof of semantic correctness, fairness, calibration, or causal interpretation. Matching opposite-label texts also does not identify the cause of their different labels.
- The theoretical noise bound relies on strong assumptions. The authors interpret the semantic audit gap as implying inflation around 1.30-1.45 rather than 1.20, but the supplied text does not provide the referenced relaxation table or a full derivation of that adjustment.
- The manuscript describes inference as a pure text function but also relies on LLM application of semantic codebooks. It does not specify a compiled non-LLM implementation for those semantic rules, so LLM-free inference is not established by the supplied description.
- Single splits, fixed-basis seed checks, and human clarity audits on two tasks leave discovery variability and broader transfer unresolved. Deterministic lexical features should be distinguished from semantic features when interpreting pooled agreement.
- Reported discovery costs are USD 5-15 and 3-10 hours per 1,000-example dataset, versus about USD 1-2 for TBM. Explicit cues may be vulnerable to adversarial paraphrase.

The supplied manuscript gives no publication year, venue, DOI, or arXiv identifier for this paper; these are left unspecified.

## Related Concepts

- [[concepts/agreement-tested-text-features|Agreement-Tested Text Features]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/text-embedding-models|Text Embedding Models]]

## Related Papers

- Ludan et al. (2024), "Interpretable-by-design text understanding with iteratively generated concept bottleneck": the closest text-side baseline, cited as reference 17.
- Koh et al. (2020), "Concept bottleneck models": the named intermediate-representation framework, reference 13.
- Mahinpei et al. (2021), "Promises and pitfalls of black-box concept learning models": concept leakage concerns, reference 18.
- Cohen (1960), "A coefficient of agreement for nominal scales": the agreement statistic used in the screen, reference 5.

[[index|Library home]]
