---
title: "IXPLORE: Bounded Ideal Point Estimation with Grid-Based Uncertainty Quantification"
type: paper
authors:
  - Fynn Bachmann
year: null
source_job_id: "b369c624-99b2-49fe-aec9-595ee5f9672b"
tags:
  - ideal-point-estimation
  - uncertainty-quantification
  - missing-data
  - political-methodology
---

## TL;DR

IXPLORE alternates logistic item fitting with posterior inference on a bounded two-dimensional grid to place respondents with incomplete answers on political maps. Across five datasets, it achieves the lowest reported test-imputation mean absolute error (MAE), tying IDEAL on Voteview. Its main advantage is inference directly from observed answers; nonlinear response surfaces improve training reconstruction but can worsen imputation under high sparsity. The grid represents uncertainty about user positions conditional on fitted item parameters.

## Research Question

Can a bounded political map combine accurate reconstruction, prediction of missing answers for new respondents, and uncertainty about their positions when only a few responses are available?

## Motivation

Voting advice applications and online deliberation platforms must place new users in an existing map before they have answered all items. The evaluated PCA and neural embedding pipelines require input imputation, whereas likelihood-based spatial models can use partial response vectors directly. IXPLORE combines the latter property with iterative predictive fitting and a fixed visualization frame.

## Contributions

- Introduces Iterative X-Posterior LOgistic Regression Embedding, coupling per-item logistic models to a bounded grid posterior over respondent positions.
- Supports binary and rescaled ordinal responses, optional confidence weights, and linear, polynomial, or random Fourier feature response surfaces.
- Separates reconstruction from imputation and training users from new users in a five-dataset comparison with ten baseline algorithms.
- Studies how prior strength, initialization, posterior summaries, and response weighting affect prediction and map geometry.

## Method

For observed items $O_n$ and responses $Y_{nk}\in[0,1]$, the response surface is

$$
y_k(x)=\sigma\bigl(\beta_k^\top\varphi(x)+\alpha_k\bigr).
$$

The linear variant resembles a multidimensional logistic [[concepts/item-response-theory|Item Response Theory]] model. A truncated isotropic Gaussian prior restricts positions to $[-L,L]^2$; an alternative log-barrier prior suppresses mass at the boundary. On an equally spaced grid, respondent probabilities are normalized from

$$
q_n(g)\propto p(g)\exp\left\{\sum_{k\in O_n}W_{nk}
\left[Y_{nk}\log y_k(g)+(1-Y_{nk})\log(1-y_k(g))\right]\right\}.
$$

Missing answers contribute no likelihood terms. For fractional responses, the method uses the same Bernoulli-form objective without thresholding; it does not specify an ordinal category likelihood. [[concepts/grid-based-posterior-inference|Grid-Based Posterior Inference]] supplies the posterior mean $\tilde x_n=\sum_g gq_n(g)$ and a discrete distribution for uncertainty and sampling.

Training initializes positions randomly or through iteratively imputed PCA, then alternates posterior-mean updates with regularized per-item logistic regression using Newton-Raphson optimization. The item step uses point embeddings rather than integrating its objective over each respondent's posterior. A new user requires one posterior evaluation with item parameters fixed. PCA initialization uses imputation, even though subsequent user inference does not.

The paper distinguishes the plug-in prediction $y_k(\tilde x_n)$ from posterior averaging $\sum_g y_k(g)q_n(g)$. Appendix A.2 selects the posterior-mean plug-in as the default based on held-out MAE. Baseline-comparison defaults are $L=1$, $R=200$ grid coordinates per axis, $\tau^2=0.25$, ten iterations, identity features, uniform weights without scaling, and an item penalty of $10^{-8}$. Configuration experiments use $R=100$ (Table 3).

The supplied paper identifies a [reproduction repository](https://github.com/fsvbach/ixplore-paper).

## Experiments

### Data and Protocol

| Dataset | Respondents and items | Distinctive setting |
| --- | --- | --- |
| Smartvote 2019 | 1,912 candidates; 75 items | Complete four-category responses |
| Smartvote 2023 | 1,029 training candidates and 1,121 test voters; 75 items | Candidate-to-voter distribution shift |
| Voteview, 117th Senate | 102 senators; 603 retained votes | Binary responses; 5.2% missing |
| Polis, vTaiwan | 1,921 participants; 197 statements | Ternary responses; 86.9% missing |
| European Values Study 2017 | 35,116 complete-case respondents; 32 items | Large survey across 34 countries |

Where no separate test population exists, users are held out. Additional uniform masking uses fractions $0,0.3,0.6,0.9$ and five random seeds. Training performance is evaluated across training masks; test users are embedded using the model fitted at zero additional training masking. Reconstruction concerns revealed answers, while imputation concerns withheld answers. MAE uses continuous responses; accuracy thresholds at 0.5 and excludes exactly neutral ground truths.

Comparators include linear and logistic-decoded PCA, kernel PCA, t-SNE, UMAP, two VAE variants, IDEAL, emIRT, and LSIRM. All use two latent dimensions except the one-dimensional emIRT implementation. Binary-only methods threshold responses and discard neutral entries. Some baselines, including IDEAL and LSIRM, are unavailable on EVS because of computational constraints.

### Predictive Findings

On Smartvote 2023, the aggregated MAEs in Table 2 are:

| Algorithm | Train reconstruction | Train imputation | Test reconstruction | Test imputation |
| --- | --- | --- | --- | --- |
| Linear PCA | 0.245 | 0.274 | 0.282 | 0.301 |
| Logistic PCA | 0.175 | 0.206 | 0.267 | 0.289 |
| IDEAL | 0.180 | 0.210 | 0.241 | 0.270 |
| LSIRM | 0.200 | 0.230 | 0.230 | 0.278 |
| IXPLORE | 0.168 | 0.200 | 0.232 | 0.261 |

IXPLORE leads three cells; LSIRM leads test reconstruction. Across the other datasets, IXPLORE's test-imputation MAE is 0.193 on Smartvote 2019, 0.251 on Polis, 0.083 on Voteview (tied with IDEAL), and 0.221 on EVS (Tables 6-9). These MAE results do not imply uniform superiority in classification accuracy: on Polis, for example, logistic VAE test-imputation accuracy is 81.4%, versus 79.3% for IXPLORE.

In the Smartvote 2023 dimensionality sweep, logistic PCA matches IXPLORE's training reconstruction at three dimensions and linear PCA at 21. Neither matches its training or test imputation MAE anywhere in the tested range of 1-74 dimensions (Section 5.1.2).

### Configuration and Uncertainty Findings

- PCA initialization reaches near-converged predictive performance in fewer than two iterations in the reported study; random initialization takes roughly ten iterations for imputation to converge.
- Prior variance strongly changes central shrinkage and boundary crowding while reconstruction remains near MAE 0.18. Prior selection is therefore also a visualization choice.
- Random Fourier features lower average training reconstruction MAE from 0.166 to 0.144. At 90% training masking, polynomial and Fourier transforms worsen training imputation MAE relative to the linear model by 0.015 and 0.021; test performance shows no visible difference (Section 5.2.3).
- With five revealed answers, posterior-mean plug-in prediction gives MAE 0.2255, versus 0.2313 for MAP and 0.2439 for full posterior averaging. The mean-based prediction leads at all seven tested answer counts (Table 4).
- Half of held-out voters' running posterior means first enter their final posterior's one-standard-deviation ellipse by 23 answers, and 95% by 53. This is a localization diagnostic relative to the final fitted posterior, not a coverage test against known true positions (Appendix A.2.3).
- Confidence-weight schedules change imputation MAE by at most 0.0015 within each scaling setting. Equalizing total response weight reduces sparse-user distortion but increases boundary crowding (Appendix D).

## Limitations

- A grid requires $R^d$ points in $d$ dimensions. Dense user-grid evaluations limit dimensionality and population size; the vectorized likelihood still has arithmetic cost $O(NKR^2)$ in two dimensions.
- User posteriors condition on fitted item parameters. The paper does not establish frequentist interval coverage or propagate a joint posterior over item parameters and positions.
- The square support breaks arbitrary [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]], and axes still require substantive labeling. Strong priors can compress positions; nonlinear surfaces can fragment agreement regions and weaken spatial-utility interpretations.
- Weak item regularization produces signs of overfitting on binary and highly sparse data. Better training reconstruction is not necessarily better imputation or measurement validity.
- Additional masking is uniform at random and does not model selective nonresponse. The data table records existing missingness in both Polis and Voteview, despite the limitations section's broader statement that only Polis is incomplete.
- Comparisons mix continuous-input and binary-only methods and omit some expensive EVS baselines. The experiments primarily assess prediction rather than reliability or substantive validity of political scales.
- The prose claims lowest or second-lowest MAE in every evaluation cell, but Table 7 places IXPLORE's Polis training-imputation MAE of 0.256 behind logistic PCA (0.240), binarized IXPLORE (0.252), and logistic VAE (0.253). The narrower test-imputation result above follows the tables.
- The supplied Markdown specifies no publication year, venue, DOI, or arXiv identifier; the year remains unknown.

## Related Concepts

- [[concepts/grid-based-posterior-inference|Grid-Based Posterior Inference]]: direct normalization over a low-dimensional bounded latent domain.
- [[concepts/item-response-theory|Item Response Theory]]: respondent traits and item-specific response functions.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: the relationship between coordinate geometry and identification.
- [[concepts/non-ignorable-missingness-in-latent-trait-models|Non-Ignorable Missingness in Latent Trait Models]]: the separate problem of modeling selective participation.

## Related Papers

- Potthoff (2018), "Estimating Ideal Points from Roll-Call Data: Explore Principal Components Analysis, Especially for More Than One Dimension?": cited foundation for PCA embeddings with logistic item decoding.
- Bachmann, Sarasua, and Bernstein (2024), "Fast and Adaptive Questionnaires for Voting Advice Applications": supplies the cited reconstruction/imputation evaluation framework.
- Clinton, Jackman, and Rivers (2004), "The Statistical Analysis of Roll Call Data": cited Bayesian ideal-point baseline.
- Imai, Lo, and Olmsted (2016), "Fast Estimation of Ideal Points with Massive Data": cited EM-based scalable estimation.
- [[papers/uncertainty-aware-ideal-point-estimation-via-variational-em|Uncertainty-Aware Ideal Point Estimation via Variational EM]]: a library comparison, not a cited work in this manuscript; estimates likelihood-based standard errors through variational information calculations rather than a conditional grid posterior.

[[index|Library home]]
