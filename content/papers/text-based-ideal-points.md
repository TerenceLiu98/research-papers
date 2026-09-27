---
title: Text-Based Ideal Points
type: paper
authors:
  - Keyon Vafa
  - Suresh Naidu
  - David M. Blei
year: 2020
source_job_id: "6f433db1-a407-414c-ac2d-f2b47f6fe9c2"
tags:
  - text-as-data
  - ideal-point-estimation
  - topic-modeling
  - variational-inference
  - political-methodology
---

## TL;DR

The text-based ideal point model (TBIP) jointly estimates authors' political positions, latent topics, and ideological changes in word choice from authored texts without votes, party labels, or labeled debate topics. Reported correlations with Bayesian vote-based ideal points are 0.88 for 114th Senate speeches and 0.94 for that Senate's tweets. TBIP also outperforms the tested Wordfish and Wordshoal implementations on three earlier Senate speech corpora. Its bag-of-words representation can nevertheless mistake criticism of a policy for language associated with its supporters.

## Research Question

Can an unsupervised model recover interpretable political positions and topic-specific framing from texts alone, including for authors who do not vote on a common set of bills?

## Motivation

Roll-call models estimate positions from shared legislative choices, but exclude many political actors and compress the reasons for supporting or opposing a bill into a binary response. [[concepts/text-scaling-models|Text Scaling Models]] extend measurement to speeches and other communication. TBIP uses political framing as its organizing idea: authors can discuss the same issue using different words that convey different political perspectives. Learning the issues themselves allows documents to mix topics without requiring debate labels.

## Contributions

- Introduces an unsupervised Poisson topic model with neutral word intensities, ideological word adjustments, and a shared scalar position for each author.
- Develops stochastic variational inference and a correction for differences in authors' average document length.
- Compares inferred positions with roll-call estimates and two text-scaling baselines, and demonstrates application to presidential candidates without a shared voting record.
- Uses document likelihood contrasts to interpret fitted positions and expose model failures; these diagnostics are explicitly noncausal.

## Method

### Generative Model

For document $d$, term $v$, topic $k$, and author $a_d$, the [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]] specifies

$$
y_{dv} \sim \operatorname{Poisson}\left(
w_{a_d}\sum_{k=1}^{K}\theta_{dk}\beta_{kv}
\exp(x_{a_d}\eta_{kv})\right).
$$

Here $\theta_{dk}>0$ represents document-topic intensity, $\beta_{kv}>0$ is a neutral topic-word intensity, $x_s$ is author $s$'s scalar ideal point, and $\eta_{kv}$ is the topic-specific ideological adjustment. Matching signs of $x_s$ and $\eta_{kv}$ increase the contribution of a term; opposite signs decrease it. Setting the ideological adjustments to zero recovers Poisson factorization. Multiple topics do not give an author multiple ideal-point dimensions: the same $x_s$ enters every topic.

Equation (3) presents the model without $w_{a_d}$. Appendix A adds this observed verbosity adjustment, with $w_s=n_s/(S^{-1}\sum_{s'}n_{s'})$ and $n_s$ the author's average document word count. The authors report little effect on correlation results but improved qualitative interpretation. The experiments use Gamma$(0.3,0.3)$ priors on $\theta$ and $\beta$, standard Normal priors on $x$ and $\eta$, and 50 topics.

### Inference and Interpretation

Mean-field variational inference uses independent lognormal factors for positive variables and Gaussian factors for real-valued variables. Hierarchical Poisson factorization initializes document intensities and neutral topics. Reparameterized Monte Carlo gradients, document minibatches, and Adam optimize the evidence lower bound; posterior means provide parameter estimates (Section 4, Appendices A-B). This is an unamortized approximation, with variational parameters fitted for the latent variables.

The Senate speech setup uses batches of 512 and one Monte Carlo sample per gradient estimate. Counts undergo an add-one, logarithm, and rounding transformation to reduce the influence of long speeches. Tweet models use untransformed counts and batches of 1,024. Speech training is reported to take five hours on one NVIDIA Titan V GPU, not as a controlled speed comparison with the baselines.

Topic displays compare expected intensities at ideal points of -1, 0, and +1. Political interpretations of the poles are assigned after fitting. For document $d$, the contrast $\ell_d(\hat{x}_{a_d})-\ell_d(0)$ measures how much better its fitted position explains its text than a neutral position, holding other fitted parameters fixed. Analogous contrasts against extreme positions help explain moderation. They diagnose model fit rather than the causal effect of a speech or word.

## Experiments

### Corpora and Comparison Design

| Setting | Data and evaluation |
| --- | --- |
| 114th Senate speeches | 19,009 documents from 99 senators; 14,503 terms after preprocessing. Compared with Bayesian roll-call ideal points and inspected for interpretable topics. |
| 111th-113th Senate speeches | Debate-labeled corpora from Lauderdale and Herzog support comparison with Wordfish and Wordshoal. Each session is fitted separately using a common variational inference approach. |
| 114th Senate tweets | 209,779 tweets after preprocessing. Compared with roll-call estimates and Wordfish; Wordshoal cannot be applied without debate labels. |
| 2020 Democratic presidential candidates | 45,927 tweets from 19 candidates, January 1, 2019-February 27, 2020. Qualitative interpretation without a shared vote-based benchmark. |

Speech preprocessing removes stopwords, procedural language, and city and state names. The 114th Senate analysis excludes senators with fewer than 24 speeches and retains unigrams, bigrams, and trigrams occurring in 0.1%-30% of documents and used by at least ten senators. Baseline speech comparisons follow Lauderdale and Herzog's preprocessing instead (Appendix B).

### Agreement With Voting Positions

Table 2 reports correlation and Spearman rank correlation (SRC) with the Bayesian vote model from Equation (1). Each cell below gives **correlation / SRC**.

| Model | Speeches 111 | Speeches 112 | Speeches 113 | Tweets 114 |
| --- | --- | --- | --- | --- |
| Wordfish | 0.47 / 0.45 | 0.52 / 0.53 | 0.69 / 0.64 | 0.87 / 0.80 |
| Wordshoal | 0.61 / 0.64 | 0.60 / 0.56 | 0.45 / 0.44 | Not applicable |
| TBIP | 0.79 / 0.73 | 0.86 / 0.85 | 0.87 / 0.84 | 0.94 / 0.84 |

The separate 114th Senate speech analysis reports correlation 0.88 (Section 5.1). Appendix C repeats the benchmark using the first dimension of DW-NOMINATE: TBIP correlations are 0.82, 0.85, and 0.89 for the three speech sessions and 0.94 for tweets, again above the applicable baselines. These are agreement statistics with estimated voting positions, not held-out prediction accuracies.

### Substantive Interpretation and Failure Cases

The fitted Senate scales largely separate parties despite using no party labels. Immigration topics distinguish references to Dreamers and DACA from emphasis on laws and homeland security. Gun-related topics distinguish violence and background checks from constitutional rights (Table 1).

Text-vote disagreement can be informative but requires inspection. Sanders has the most liberal speech position but ranks seventeenth by the paper's vote-based estimate. The authors use speeches about inequality and universal health care, and a vote whose opponents had different reasons for opposing it, to interpret this discrepancy. Fischer's equal-pay tweets similarly help explain a more moderate textual position than her voting position (Section 5.3).

Jeff Sessions provides an explicit failure case: a speech criticizing DACA uses vocabulary associated with liberals, moving the text estimate toward the center. TBIP captures the term's association but misses the speaker's negative stance. Thus disagreement does not consistently favor either textual or voting measures.

Among presidential candidates, Warren and Sanders appear at the progressive end and Bullock and Delaney at the moderate end. Topics distinguish Medicare for All from public-option language and the Green New Deal from technological climate solutions. These are qualitative findings, not accuracy measurements against independently known candidate positions (Section 5.4).

## Limitations

- Bag-of-words counts omit sentiment and compositional meaning. The Sessions example shows how mentioning an opposing policy can distort the inferred position.
- One shared author dimension constrains [[concepts/ideological-dimensionality|Ideological Dimensionality]] even with many latent topics. A meaningful ordering in these corpora does not establish validity for other political systems, languages, or populations.
- Roll-call estimates are useful comparison measures, not observed ideological truth. Pooled agreement and party separation do not establish accurate within-party rankings or calibrated posterior uncertainty.
- The candidate sample excludes Andrew Yang, Jay Inslee, and Marianne Williamson because the authors regard nontraditional or single-issue candidates as difficult to place. This limits the demonstration's coverage.
- Baselines are fitted separately by Senate session with the authors' variational procedure. Appendix B explicitly distinguishes this design from Lauderdale and Herzog's joint analysis across time; the results should not be generalized to every implementation of Wordfish or Wordshoal.
- Preprocessing and verbosity adjustments are substantive measurement choices. Appendix B's tweet paragraph refers to replacing a 0.01% speech threshold, while the speech paragraph states 0.1%. The exact contrast is inconsistent in the supplied text.

The supplied Markdown has extensive extraction artifacts and provides no explicit publication year, venue, DOI, or arXiv identifier for this paper. The year above follows the existing library review's citation to Vafa, Naidu, and Blei (2020). No missing identifier or software URL is reconstructed. Numerical results above use the supplied text and tables.

## Related Concepts

- [[concepts/text-based-ideal-point-model|Text-Based Ideal Point Model]]: joint estimation of topics, ideological word adjustments, and author positions.
- [[concepts/text-scaling-models|Text Scaling Models]]: broader family of methods for positioning political texts.
- [[concepts/item-response-theory|Item Response Theory]]: related latent-trait structure of the roll-call benchmark.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes topic diversity from independent political axes.

## Related Papers

- Slapin and Proksch (2008), "A scaling model for estimating time-series party positions from texts": cited Wordfish baseline.
- Lauderdale and Herzog (2016), "Measuring political positions from legislative speech": cited Wordshoal baseline and source of debate-labeled comparison data.
- Gerrish and Blei (2011), "Predicting legislative roll calls from text": cited method combining bill text with votes, whereas TBIP requires authored texts and author identities.
- [[papers/computational-measurement-of-political-positions-a-review-of-text-based-ideal-point-estimation-algorithms|Computational measurement of political positions: a review of text-based ideal point estimation algorithms]]: a later library review that explicitly places TBIP in its topic-modeling family.
- [[papers/positioning-political-texts-with-large-language-models-by-asking-and-averaging|Positioning Political Texts with Large Language Models by Asking and Averaging]]: a later library comparison using prompted text scores and aggregation; its experiments are not part of this paper.

[[index|Library home]]
