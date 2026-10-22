---
title: "Causal Inference with Latent Treatments"
type: paper
authors:
  - Christian Fong
  - Justin Grimmer
year: 2023
source_job_id: "7d22c77c-1bc8-4ac0-b93d-bc2a352359c4"
tags:
  - causal-inference
  - text-as-treatment
  - experimental-design
  - survey-experiments
  - latent-treatments
---

## TL;DR

Random assignment of whole texts does not by itself identify the causal effect of a feature encoded in those texts. Other outcome-relevant text features can covary with the measured feature and confound its estimated effect. Fong and Grimmer formalize the required assumptions and recommend using many texts per treatment condition so researchers can average over textual variation and measure plausible confounding features after data collection. A many-vignette experiment finds that information about prior U.S. commitments increases support for Hong Kong protesters in two waves; an observational analysis of Trump tweets illustrates both latent-feature discovery and sensitivity to a previously unmeasured sentiment feature.

## Research Question

Under what assumptions can researchers identify and estimate the causal effect of a low-dimensional latent treatment, such as negativity or topic, when that treatment is an analyst-defined feature of a high-dimensional intervention such as a text?

## Motivation

Researchers usually care about a feature within a document rather than the effect of the document as an indivisible object. But a feature cannot be randomized without changing the text, and changing the text can also change other consequential features. Random assignment solves confounding in who receives a document; it does not ensure that the target feature is independent of other features within the assigned documents. Standard single-vignette designs also estimate effects conditional on one particular realization of all remaining textual attributes.

## Contributions

- Defines latent treatments through an analyst-specified codebook function and separates them from unknown, outcome-relevant features of the same high-dimensional intervention.
- Shows that a difference in means identifies the average treatment effect only under assumptions analogous to avoiding omitted-variable bias: measured and unmeasured treatments must be independent, or the unmeasured treatments must not affect the outcome in expectation.
- Distinguishes aliasing, which threatens attribution within a vignette, from interactions with background text features, which restrict generalization beyond that vignette.
- Recommends many versions per treatment condition so studies can marginalize over text realizations and later measure and adjust for plausible textual confounders.
- Demonstrates the framework in a constructed many-vignette survey experiment and an observational study using machine-learned features of naturally occurring tweets.

## Method

Let a text $X_i$ determine a measured latent treatment $Z_i=g(X_i)$ and unknown outcome-relevant treatments $B_i=h(X_i)$. The target averages the feature contrast over the distribution of the unmeasured treatments:

$$
\operatorname{ATE}=\sum_b\left(\mathbb{E}[Y_i(1,b)]-\mathbb{E}[Y_i(0,b)]\right)\Pr(B_i=b).
$$

Identification requires: no interference across respondents; random or ignorable assignment of texts with positive probability; a representation $(Z_i,B_i)$ sufficient for expected responses with support for both values of $Z_i$ at each $B_i$; and either $Z_i \perp B_i$ or no average outcome effect of $B_i$. Under these conditions, the observed difference in mean outcomes between texts coded with and without the treatment consistently estimates the ATE.

This distinction matters for [[concepts/text-as-treatment|Text as Treatment]]. A text can be randomly assigned while its coded feature remains correlated with another feature inside the text. Conditioning on the complete text does not solve the problem because an identical text cannot simultaneously contain and omit a deterministic feature; the relevant comparisons instead require [[concepts/causal-overlap|Causal Overlap]] over outcome-relevant background features.

For vignette experiments, a feature may be aliased when changing it necessarily changes another attribute. Even without aliasing, one vignette per condition identifies a local effect conditional on that vignette's remaining attributes. The proposed design uses many independently varied versions per condition, allowing researchers to average over those attributes and to code plausible confounders retrospectively. The authors advise prioritizing prevalent features plausibly related to outcomes and avoiding adjustment for features caused by the treatment itself.

## Experiments

### Hong Kong commitments

The authors study whether information about prior U.S. legal commitments increases support for helping Hong Kong protesters. They independently vary seven argument components and use 100 versions of the commitment component, producing 555,660 possible texts. Respondents rate support on a 0-100 scale in December 2019 ($N=1,983$) and October 2020 ($N=2,072$).

The reported commitment effects are 5.23 (standard error 1.74) and 2.68 (1.23). A retrospective check finds that references to historical dates correlate with commitment in both waves and with the outcome in the first. After adding this previously unmeasured feature to the regression, the commitment estimates remain similar at 4.74 (1.83) and 2.54 (1.16). The design makes this adjustment possible because date references vary across the many texts.

### Reactions to Trump tweets

The second application uses YouGov ratings of Donald Trump's tweets from February through October 2017, aggregated separately for Democrats, Independents, and Republicans. The authors split tweets into training and test sets, use a supervised Indian Buffet Process on the training set to discover five latent features, and estimate their associations with ratings in the held-out test set ($N=752$ party-tweet observations per partisan regression).

Tweets attacking the media or Hillary Clinton receive lower ratings in all three groups, including Republicans; tweets about symbolic topics including national-anthem protests receive relatively higher ratings. Because attack tweets are also less positive in sentiment, the authors code sentiment as a previously unmeasured treatment and adjust for it. The attack-feature coefficients attenuate but remain negative: for Democrats, Independents, and Republicans they change from -45.22, -31.75, and -18.91 to -33.83, -27.27, and -15.28, respectively. These results illustrate the adjustment workflow, but the observational application's causal interpretation still depends on assignment, interference, sufficiency, and unmeasured-treatment assumptions.

## Limitations

- The decisive assumptions concern unknown features and cannot be verified exhaustively. Checking one plausible confounder does not establish that none remain.
- Many texts permit retrospective adjustment only for features that actually vary and have adequate joint support with the measured treatment.
- Single-vignette comparisons can validly estimate the effect of one complete text relative to another, but feature attribution and generalization require stronger no-aliasing and no-interaction conditions.
- The Hong Kong application tests one political communication setting; its effects do not establish that every many-vignette design satisfies the framework's assumptions.
- The Trump application uses naturally occurring tweets and aggregated ratings. Exposure outside the survey, media reactions, respondent selection, and YouGov's assignment process may violate the stated assumptions.
- Selecting machine-learned treatments on a training split prevents using the same observations for discovery and effect estimation, but it does not remove latent confounding or make the selected features uniquely interpretable.

## Related Concepts

- [[concepts/text-as-treatment|Text as Treatment]]: the broader setting in which documents bundle a target feature with other consequential content.
- [[concepts/causal-overlap|Causal Overlap]]: supplies the support condition needed to compare treatment values at common background features.
- [[concepts/treatment-confounder-separability|Treatment-Confounder Separability]]: a related formulation of whether a feature can change while other outcome-relevant content is preserved.
- [[concepts/structured-treatments|Structured Treatments]]: places text, image, audio, and other high-dimensional interventions in a common causal framework.

## Related Papers

- Fong and Grimmer (2016), "Discovery of Treatments from Text Corpora": supplies the latent-treatment discovery procedure extended in the tweet application.
- Dafoe, Zhang, and Caughey (2018), "Information Equivalence in Survey Experiments": studies respondent inferences from vignette manipulations; the present paper distinguishes those from confounding among features of the text itself.
- Hainmueller, Hopkins, and Yamamoto (2013), "Causal Inference in Conjoint Analysis": supplies the average marginal component effect framework used for multiple randomized textual components.
- Pryzant et al. (2020), "Causal Effects of Linguistic Properties": motivates the paper's discussion of overlap and ill-defined comparisons from conditioning on complete text.
- [[papers/a-design-based-solution-for-causal-inference-with-text-can-a-language-model-be-too-large|A Design-based Solution for Causal Inference with Text: Can a Language Model Be Too Large?]]: extends the text-curation logic with participant-written paired edits.
- [[papers/causal-inference-with-generative-artificial-intelligence-application-to-texts-as-treatments|Causal Inference with Generative Artificial Intelligence: Application to Texts as Treatments]]: develops a representation-based approach and reanalyzes the Hong Kong experiment.

[[index|Library home]]
