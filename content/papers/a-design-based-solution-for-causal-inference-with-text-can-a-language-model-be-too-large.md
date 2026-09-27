---
title: "A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?"
type: paper
authors:
  - Graham Tierney
  - Srikar Katta
  - Christopher Bail
  - Sunshine Hillygus
  - Alexander Volfovsky
year: 2025
tags:
  - causal-inference
  - text-as-treatment
  - experimental-design
  - causal-overlap
  - intellectual-humility
---

## TL;DR

The paper proposes a participant-written, participant-edited text experiment that estimates the effect of a linguistic feature by comparing original messages with edits that reverse that feature. Unbiasedness requires edits to preserve all other outcome-relevant features and texts to be randomly assigned to evaluators. In a political-communication experiment, intellectually humble wording reduces perceived aggression, informativeness, and persuasiveness to the reader. In semi-synthetic benchmarks using the collected texts, bag-of-words inverse propensity weighting outperforms the tested DistilBERT-based causal estimators, whose learned representations exhibit overlap problems. This is evidence about these estimators and implementations, not a model-size scaling experiment.

## Research Question

How can researchers identify the causal effect of a linguistic property when it is entangled with other text features, and when representations used to adjust for those features may also encode the treatment itself? Substantively, how does expressing intellectual humility change readers' evaluations of political arguments?

## Motivation

Randomly showing readers humble versus arrogant messages identifies the effect of exposure to those document pools. It need not isolate humility: the messages may also differ in topic, vividness, or other outcome-relevant properties. Conditioning on the complete text cannot solve this problem because, under the paper's interpretation assumptions, identical words cannot carry different treatment values. A useful adjustment representation must retain confounding information while preserving comparisons between treatment states.

## Contributions

- Distinguishes the effect of exposure to documents bearing a feature from the effect of changing that feature while holding other latent content fixed.
- Introduces a four-stage design using separate writers, editors, and evaluators, with multiple candidate edits per original message.
- Gives a within-original-text estimator and a weighted least squares implementation, with unbiasedness under explicit editing and random-assignment assumptions (Proposition 4.1).
- Uses experimentally evaluated human texts to benchmark causal estimators under controlled selection and outcome modifications.
- Estimates the effects of humble wording on six perceptions of political arguments about climate change, gun control, and immigration.

## Method

### Estimands and assumptions

Let $W$ denote words, $D$ a document's treatment label, $T$ the latent linguistic treatment, and $Z$ other outcome-relevant latent content. The framework assumes no treatment misclassification ($D=T$), consistent interpretation ($T$ and $Z$ are deterministic functions of $W$), and the stated SUTVA conditions. It separates

$$
\tau_d=E[Y(D=1)-Y(D=0)]
$$

from

$$
\tau_t=E[Y(T=1,Z)-Y(T=0,Z)].
$$

The first allows other content to change with the assigned document pool. The second holds that content fixed. Conditioning on $W$ produces $P(T=1\mid W)\in\{0,1\}$; an embedding that retains the treatment can reproduce this obstacle even when overlap holds conditional on the intended confounders.

### Text creation and estimation

Researchers select a linguistic feature, topics, and outcomes. Trained writers generate messages with or without the feature. Separate trained editors reverse the feature while preserving other content, producing multiple edits per original. Separate evaluators are randomly assigned texts and supply outcome ratings. Originals without valid edits cannot enter the paired analysis.

For original-text group $i$, let $\bar Y_{i,1}$ and $\bar Y_{i,0}$ be mean outcomes for treated and control versions. Equation 6 is

$$
\widehat\tau_t=\frac{1}{N}\sum_{i=1}^N(\bar Y_{i,1}-\bar Y_{i,0}).
$$

This equally weights original-text groups rather than giving groups with more edits greater influence. The equivalent weighted least squares specification includes original-text fixed effects and inverse counts of versions in each group's treatment arm. The paper describes within-group permutation inference or asymptotic weighted least squares inference. Its empirical analysis also includes evaluator random effects because evaluators rate multiple texts.

Proposition 4.1 requires $T(W_{i1})=1-T(W_{ij})$, $Z(W_{i1})=Z(W_{ij})$ for edited versions, and random assignment to evaluators. The editing protocol makes these conditions auditable; asking editors to preserve content does not itself establish that every latent feature was preserved.

## Experiments

### Political-communication experiment

The initial writing stage produced 176 humble and 167 non-humble texts. The prose reports 1,830 unique original and edited texts, 6,994 evaluations, and 1,400 evaluators. A subsequent humility-rating audit removed edits that moved humility in the wrong direction, reported as 5.95%, and then 4.74% of originals that had no remaining edited counterpart. The final analysis contains 1,682 texts and 6,195 evaluations per outcome.

Table 5 reports the following humility coefficients on five-point rating scales. Parentheses in the source give standard errors; significance follows the source's thresholds.

| Outcome | Estimated effect | Standard error | Reported significance |
| --- | ---: | ---: | --- |
| Perceived aggression | -0.57 | 0.06 | $p<0.01$ |
| Articulation | -0.01 | 0.07 | Not significant at 0.10 |
| Enjoyability of conversation with the author | 0.03 | 0.07 | Not significant at 0.10 |
| Informativeness | -0.17 | 0.07 | $p<0.05$ |
| Persuasiveness to the reader | -0.16 | 0.07 | $p<0.05$ |
| Perceived persuasiveness to an undecided other | -0.08 | 0.06 | Not significant at 0.10 |

These are perceptions of isolated messages. The nonsignificant estimates do not establish exact zero effects, and the experiment does not directly measure changes in political polarization or behavior.

### Semi-synthetic estimator benchmark

The authors create 100 replicas using real participant texts and evaluations. Respectfulness controls selection into filtered datasets. Baseline-confounding runs retain observed outcomes; amplified-confounding runs modify outcomes to strengthen respectfulness as a confounder and establish a nonzero treatment effect. Outcomes are dichotomized for compatibility with the evaluated TextCause implementation. Reference bands show the 2.5th to 97.5th percentiles of design-based estimates across replicas, rather than analytically known population effects.

Comparators include difference in means, topic adjustment, bag-of-words outcome regression, inverse propensity weighting (IPW), augmented IPW, TextCause, and the Treatment Ignorant (TI) estimator with propensity trimming or winsorization. Both neural implementations use DistilBERT. Bag-of-words nuisance models use random forests and five-fold cross-fitting. Appendix A.1 documents implementation adaptations, including sample splitting for TextCause and cross-fitting for TI, while retaining default representation-learning hyperparameters.

Under amplified confounding, naive and topic-adjusted estimates miss the reference effects. Bag-of-words IPW is consistently within the reference bands; bag-of-words outcome regression is less reliable. TextCause produces near-null estimates, while trimmed and winsorized TI estimates fail to recover the reference effects. For every outcome, all 100 amplified-confounding replicas contain at least one TI propensity estimate equal to zero or one, making unmodified AIPW non-computable. In the displayed aggression run, 33% of TI propensities lie at or beyond 0.1 and 0.9, versus 17% for bag-of-words propensities (Tables 2 and 6).

The authors interpret the neural failures as treatment encoding and inadequate confounder recovery. TI propensity estimates directly demonstrate estimated-overlap problems; the explanation of TextCause's null estimates is an interpretation of its behavior rather than a direct measurement of its latent representation.

## Limitations

- **Identification remains conditional.** Correct labels, consistent interpretation, random assignment, and preservation of all non-treatment outcome-relevant features are substantive assumptions. Auditing the direction of humility changes does not verify preservation of every other latent feature.
- **The application is narrow.** The experiment concerns trained participants and isolated arguments on three political topics. Interactive conversations, long-term persuasion, behavioral outcomes, and population-level depolarization remain untested. Excluding unsuccessful edits also limits the analyzed corpus to messages with retained counterparts.
- **The benchmark does not vary model size.** It evaluates particular DistilBERT-based implementations with default learning hyperparameters and semi-synthetic outcome construction. It does not show that increasing parameter count necessarily worsens causal estimation, or that bag-of-words adjustment always suffices.
- **Reference effects are estimated.** The experimental estimator supplies a benchmark under its assumptions; its empirical percentile bands are not exact population ground truth.
- **The supplied source has a count discrepancy.** Table 4's raw evaluation entries sum to 6,571, while the prose reports 6,994. Its final entries do sum to the reported 6,195. The raw-count discrepancy is unresolved in the supplied Markdown.
- **Retrospective inference remains open.** The design requires new writing, editing, and evaluation stages; it is not a general solution for observational corpora when experimentation is infeasible.

## Related Concepts

- [[concepts/text-as-treatment|Text as Treatment]]: separates document exposure effects from effects of specific linguistic features.
- [[concepts/causal-overlap|Causal Overlap]]: clarifies why encoding treatment in an adjustment representation undermines causal comparisons.
- [[concepts/intellectual-humility|Intellectual Humility]]: the manipulated linguistic property in the substantive experiment.
- [[concepts/causal-representation-learning|Causal Representation Learning]]: connects representation objectives to identification requirements.
- [[concepts/structured-treatments|Structured Treatments]]: places text interventions among treatments represented by complex objects.
- [[concepts/double-machine-learning|Double Machine Learning]]: supplies the cross-fitting context for the evaluated nuisance estimators without removing overlap requirements.

## Related Papers

The following works are cited in the supplied manuscript:

- Fong and Grimmer (2023), "Causal inference with latent treatments": the text-curation approach extended by the participant editing design.
- Pryzant et al. (2020), "Causal effects of linguistic properties": source of the evaluated TextCause approach.
- Gui and Veitch (2022), "Causal estimation for text data with (apparent) overlap violations": source of the evaluated TI approach.
- Imai and Nakamura (2024), "Causal representation learning with generative artificial intelligence: Application to texts as treatments": a generative approach discussed as an alternative design.

Related library reading, rather than citations attributed to this manuscript:

- [[papers/structured-pixels-satellite-imagery-as-the-cause-in-causal-effect-estimation|Structured Pixels: Satellite Imagery as the Cause in Causal Effect Estimation]]: considers rich objects as treatments through an observational image representation and covariate-adjustment approach.
- [[papers/toward-causal-representation-learning|Toward Causal Representation Learning]]: reviews the broader problem of defining intervention-relevant variables from unstructured observations.

[[index|Library home]]
