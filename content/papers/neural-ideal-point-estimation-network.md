---
title: Neural Ideal Point Estimation Network
type: paper
authors:
  - Kyungwoo Song
  - Wonsung Lee
  - Il-Chul Moon
year: null
source_job_id: "dae0ab0d-1127-4719-9ec5-7709c1c56fa2"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - autoencoders
  - social-networks
---

## TL;DR

NIPEN combines neural representations of bill text, topic-specific legislator and bill ideal points, and a learned signed network of voting associations. Its graphical-model and neural-tensor variants improve roll-call prediction over five tested baselines on two U.S. congressional datasets. The best variant depends on the dataset and metric: NIPEN-PGM(VAE) leads on Politic2013, while NIPEN-Tensor leads on three of four metrics on Politic2016. The inferred networks support exploratory interpretation, without establishing causal interpersonal influence.

## Research Question

Can jointly modeling bill content, topic-specific preferences, and relationships among legislators improve vote prediction while exposing interpretable differences in voting behavior?

## Motivation

[[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]] connect roll calls to bill topics, while collaborative filtering models can incorporate text or social relationships. NIPEN integrates these components and replaces conventional topic extraction with an autoencoder. It also asks whether nonlinear interactions across topic dimensions improve the voting model beyond a sum of independent topic contributions.

## Contributions

- Introduces NIPEN-PGM, combining an SDAE or VAE bill encoder with a logistic ideal-point model and a learned legislator network.
- Introduces NIPEN-Tensor, which applies nonlinear neural layers across topic-wise interactions in the content component.
- Learns legislator-specific weights for content and network contributions, and offers a low-rank approximation to the network matrix.
- Evaluates prediction on Politic2013 and Politic2016 and illustrates topic-specific positions, signed voting relationships, and variation in fitted content/network weights.

## Method

### Text, Ideal Points, and Network

An autoencoder maps bill word frequencies to a latent representation $z_d$. A bill's voting representation is $y_d=z_d+\xi_d$, with a Gaussian offset controlled by precision $\lambda_y$. This allows textual content and voting behavior to share information without forcing their representations to coincide.

For legislator $u$ and bill $d$, NIPEN-PGM specifies (Equation 2)

$$
\Pr(r_{ud}=1)=\sigma\left[
\alpha_u\left(\sum_k y_{dk}a_{dk}x_{uk}+\eta_d\right)
+\beta_u\sum_{u'\in I_u}\tau_{uu'}r_{u'd}
\right].
$$

Here $x_{uk}$ and $a_{dk}$ are legislator and bill ideal-point parameters, $\eta_d$ is a bill intercept, and $I_u$ contains other legislators serving in the same term. The signed, directed coefficient $\tau_{uu'}$ represents voting alignment with another legislator. Parameters $\alpha_u$ and $\beta_u$ scale content and network terms. They have Gaussian priors and are not constrained mixture proportions.

NIPEN-Tensor replaces the topic-wise summation in the content component with fully connected transformations of the topic interactions, using tanh to retain signed outputs. It retains the text and network modeling components. The prose and notation table define the interaction using $x$, $y$, and $a$; the supplied Equation 3 instead prints $z$ in one product and contains inconsistent indices and vote notation. The conceptual description is retained here without presenting that equation as an unambiguous implementation specification.

### Estimation

Training alternates between autoencoder parameters and legislative voting parameters. The VAE component uses a reconstruction term, KL regularization, and reparameterized stochastic gradients. The voting parameters use a point-mass variational approximation, yielding MAP-style optimization rather than a full posterior over ideal points and network ties. The joint objective includes vote likelihood, text-to-bill coupling, and quadratic regularization.

The optional approximation $\tau\approx\widetilde\tau_1\widetilde\tau_2$, with factors of sizes $U\times G$ and $G\times U$, reduces the network parameterization from quadratic to $O(UG)$. The paper reports $G=3$, ten latent dimensions for NIPEN, and an autoencoder architecture of $[512,128,K,128,512]$. Appendix F emphasizes sensitivity to text/vote coupling $\lambda_y$ and network regularization $\lambda_\tau$.

## Experiments

### Data and Evaluation

| Dataset | Period | Legislators | Bills | Recorded votes | Vocabulary |
| --- | --- | ---: | ---: | ---: | ---: |
| Politic2013 | 1990-2013 | 1,540 | 7,162 | 2,779,703 | 10,000 |
| Politic2016 | 1989-2016 | 1,537 | 7,975 | 2,999,844 | 13,581 |

The first dataset comes from THOMAS and Gu et al. (2014); the second is collected from GovTrack. Votes are coded YEA/NAY. The paper uses five-fold cross-validation and compares TFIPM, AutoRec, TrustSVD, CDAE, and collaborative deep learning (CDL) with four NIPEN variants. Metrics are RMSE, MAE, accuracy, and negative average log likelihood (NALL).

### Predictive Results

Selected means from Table 2 are shown below. Lower is better except for accuracy.

| Dataset | Model | RMSE | MAE | Accuracy | NALL |
| --- | --- | ---: | ---: | ---: | ---: |
| Politic2013 | TFIPM | 0.1872 | 0.0682 | 0.9526 | 0.1213 |
| Politic2013 | CDL | 0.1834 | 0.0786 | 0.9554 | 0.1147 |
| Politic2013 | NIPEN-PGM(VAE) | 0.1753 | 0.0588 | 0.9587 | 0.1075 |
| Politic2013 | NIPEN-Tensor | 0.1818 | 0.0663 | 0.9556 | 0.1155 |
| Politic2016 | TFIPM | 0.1794 | 0.0625 | 0.9566 | 0.1121 |
| Politic2016 | CDL | 0.1780 | 0.0769 | 0.9583 | 0.1106 |
| Politic2016 | NIPEN-PGM(SDAE) | 0.1779 | 0.0560 | 0.9581 | 0.1173 |
| Politic2016 | NIPEN-PGM(VAE) | 0.1753 | 0.0570 | 0.9590 | 0.1112 |
| Politic2016 | NIPEN-Tensor | 0.1729 | 0.0608 | 0.9600 | 0.1057 |

NIPEN-PGM(VAE) leads all four metrics on Politic2013. On Politic2016, NIPEN-Tensor leads RMSE, accuracy, and NALL, while the SDAE variant has the lowest MAE. Relative to the strongest baseline for each metric, the reported best-variant RMSE reductions are 4.41% and 2.87%; accuracy rises by 0.33 and 0.17 percentage points, respectively. Table 2 reports two standard deviations and one-tailed Student's t-tests against the metric-specific best baseline, with the best NIPEN results marked $p<0.01$.

The tensor model is not uniformly superior: on Politic2013 it trails the full VAE-PGM variant on every metric. The low-rank VAE variant also underperforms the full network model on all four metrics in both datasets. The authors conjecture that richer bill texts favor tensor interactions; this is an interpretation of the dataset comparison rather than a controlled test of text richness.

### Qualitative Analysis

The authors inspect NIPEN-PGM(VAE) fitted to Politic2016. Topic displays connect bill content to topic-specific positions. H.Res.794 (114th) illustrates partisan voting on a bill associated with business and finance. A selected network example links Thomas E. Petri and Jim Sensenbrenner, who agreed on 5,764 of 6,288 shared votes (91.6%). Legislator rankings by $\alpha_u$ and $\beta_u$ illustrate differences in fitted component weights. Appendix G extends these descriptive analyses to within-party networks and time patterns.

## Limitations

- Five-fold prediction does not establish prospective performance on future or wholly unseen bills. The supplied text does not fully specify fold construction or how held-out neighbor votes are masked in the network term, which conditions on other votes on the same bill.
- Learned agreement coefficients do not distinguish interpersonal influence from shared preferences, party coordination, or common circumstances. The paper's language of trust and influence should be understood as model interpretation.
- The voting parameters receive point estimates. The study does not establish calibrated uncertainty for ideal points, ties, or content/network comparisons.
- Hyperparameter sensitivity and the weaker low-rank results qualify the computational simplification. More expressive tensor interactions improve some settings, not all metrics or datasets.
- The empirical evidence is confined to two U.S. congressional datasets. Topic examples and selected relationships are exploratory validation, not independent measurements of sincere preferences.
- The supplied Markdown gives no explicit publication year, venue, DOI, or arXiv identifier; `year` is therefore null. Equations contain notation inconsistencies noted above. No missing bibliographic metadata is inferred.

## Related Concepts

- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: the topic-weighted legislator-bill interaction extended by NIPEN.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: related content-dependent modeling through offsets from general positions.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: the shared VAE encoder for bill representations; voting parameters retain point estimates.
- [[concepts/signed-political-networks|Signed Political Networks]]: signed and directed associations inferred here from voting behavior.

## Related Papers

- [[papers/topic-factorized-ideal-point-estimation-model-for-legislative-voting-network|Topic-Factorized Ideal Point Estimation Model for Legislative Voting Network]]: cited predecessor and predictive baseline.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: cited topic-aware ideal-point model.
- Wang, Wang, and Yeung (2015), "Collaborative Deep Learning for Recommender Systems": cited foundation for coupling autoencoder representations with collaborative filtering.
- [[papers/the-neural-ideal-point-model|The Neural Ideal Point Model]]: a separate library work using a multimodal encoder-decoder and MMD regularization; it is not NIPEN or a cited predecessor in this source.

[[index|Library home]]
