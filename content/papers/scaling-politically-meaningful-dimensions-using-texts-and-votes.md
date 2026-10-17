---
title: Scaling Politically Meaningful Dimensions Using Texts and Votes
type: paper
authors:
  - Benjamin E. Lauderdale
  - Tom S. Clark
year: 2014
source_job_id: "447eb97e-6a92-4c18-a32d-4d78ed94f0be"
tags:
  - ideal-point-estimation
  - topic-modeling
  - judicial-politics
  - text-as-data
---

## TL;DR

Lauderdale and Clark use topic mixtures from case opinions to define the issue dimensions of a voting model. Text determines what each vote is about, while votes estimate actors' positions on those issues. For 4,321 nonunanimous U.S. Supreme Court decisions, DIC improves up to roughly 25 topics; the authors examine a 24-dimensional solution that reveals issue-dependent justice orderings and Court medians. These dimensions depend on substantive restrictions connecting textual attention to voting preferences.

## Research Question

Can vote-specific metadata identify interpretable, high-dimensional political preferences when voting patterns alone provide too little information to distinguish and label substantive issues?

## Motivation

One- or two-dimensional scales summarize voting coalitions economically, but can conceal changes in relative preferences across policy domains. Increasing dimensionality alone introduces [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]] and makes political labels difficult to assign. The paper proposes using metadata to specify which dimensions matter for each vote, analogous to organizing educational test items into substantively defined subjects.

## Contributions

- Restricts multidimensional item discrimination using nonnegative issue mixtures derived from vote-specific metadata.
- Combines latent Dirichlet allocation (LDA) with a probit voting model, conditioning voting inference on successive text-model draws rather than fitting a fully joint text-vote model.
- Selects topic count using the voting component's deviance information criterion (DIC) and substantive inspection, rather than textual perplexity.
- Demonstrates how issue-specific justice positions change interpretations of judicial replacement and the Court's ideological evolution.

## Method

### Topic-Weighted Voting

LDA represents the text attached to vote $j$ by topic proportions $\lambda_{jd}\geq0$, with $\sum_d\lambda_{jd}=1$. Each actor $i$ has issue-specific positions $\theta_{id}$. The voting model is

$$
y^*_{ij}\sim\mathcal N\left(\alpha_j+\beta_j\sum_{d=1}^{D}\lambda_{jd}\theta_{id},1\right),
\qquad y_{ij}=\mathbf 1[y^*_{ij}\geq0].
$$

The effective position for a particular vote is $\theta_{ij}=\sum_d\lambda_{jd}\theta_{id}$ (Equations 3-5). Compared with unrestricted multidimensional [[concepts/item-response-theory|Item Response Theory]], the model replaces a separate discrimination coefficient for every vote-dimension pair with a scalar $\beta_j$ multiplying the text-derived mixture. Text fixes the relative orientation of the cutting hyperplane; votes estimate its intercept and discrimination.

All voters respond to the same mixture on a given vote. Because topic weights are nonnegative, the model excludes cutting hyperplanes with opposing discrimination signs across issues. This helps align ideological directions across dimensions but rules out some politically possible coalitions. Issue positions describe idealized single-topic votes, even when actual cases blend issues.

### Priors and Inference

The LDA priors are symmetric, with document-topic hyperparameter $\gamma=1/D$ and term-topic hyperparameter $\delta=1$. Vote parameters have independent $\mathcal N(0,4)$ priors. Actors' issue positions have a multivariate Normal prior with zero means, unit marginal variances, and a common positive off-diagonal correlation $\rho\sim\mathcal U(0,1)$. This induces shrinkage across issues.

Collapsed Gibbs sampling for LDA supplies successive draws of the mixture matrix to an IRT Gibbs sampler. Voting inference therefore uses changing text-model draws, but votes do not feed back into the LDA fit. The supplied article refers to an online appendix for the full sampling procedure; that appendix is absent from the supplied Markdown.

The selection criterion is $\mathrm{DIC}=2\overline{\mathcal D(\Theta)}-\mathcal D(\bar\Theta)$, where $\mathcal D=-2\log\mathcal L$ is calculated for votes. It is a model-based fit-complexity criterion, not a reported held-out voting accuracy.

## Experiments

### Data and Model Selection

The application covers 4,321 nonunanimous Supreme Court decisions from 1949 to 2006, involving 30 justices and at most nine voters per decision. Full case-opinion texts provide issue information. For topic counts from 1 to 40, preliminary simulations use 2,000 burn-in iterations and 4,000 sampling iterations. DIC improves until approximately 25 topics and then largely flattens (Figure 2). The authors choose 24 topics using both diminishing DIC gains and diminishing substantive novelty in the recovered topics.

### Comparison With Expert Coding

At 13 dimensions, text-derived mixtures yield lower DIC than the Supreme Court Database's 13 discrete Spaeth issue areas. Assigning each case only to its highest-weight LDA topic still improves on the expert coding, but less than retaining mixtures. Thus both the recovered categorization and mixed membership contribute to the reported gain. Moving from 13 to 24 topics improves fit further. The prose does not provide numerical DIC differences.

### Substantive Findings

- Justice orderings are correlated across issues but differ meaningfully. Justice Black appears relatively more conservative on criminal-rights issues, while tax-related dimensions show weak separation among justices (Figure 5).
- During the Warren Court, issue medians move left on civil rights and civil liberties but show little change or move right on some economic-regulation issues. These median trajectories reflect changing Court composition under the fitted issue positions (Figure 6).
- Posterior comparisons place O'Connor to Kennedy's left on roughly six issues and Kennedy to O'Connor's left on roughly four. A small descriptive before/after comparison reports declining liberal-disposition rates in four areas where her replacement was expected to shift the Court right, and no such decline in four comparison areas (Figure 7, Table 2). This is illustrative evidence rather than causal identification of a replacement effect.

## Limitations

- Text proportions need not equal the importance voters attach to each issue. Requiring a common mixture also excludes voter-specific issue salience; allowing separate mixtures would undermine the proposed cross-voter scale comparability.
- Nonnegative weights and a common vote discrimination exclude mixed-sign issue loadings. Positive prior correlations further encourage common ordering across dimensions.
- Topic decompositions are exploratory and can vary across runs. A 24-topic solution is not evidence for a uniquely true number of political dimensions; metadata choice and data density help define the measured space.
- DIC gains and plausible historical patterns do not establish out-of-sample accuracy, causal preferences, or validity for every institution. Small issue-specific case counts limit the judicial-replacement illustration.
- Using vote-derived preferences to explain voting or related outcomes in secondary analyses requires attention to circularity and the intended inference.

The supplied Markdown omits explicit publication metadata and contains damaged formulas and figure extraction. The year follows the existing library citation to Lauderdale and Clark (2014) in the Tea Party paper linked below. No missing DOI, venue, or appendix details are reconstructed.

## Related Concepts

- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: metadata constrains dimension orientation and provides substantive labels.
- [[concepts/item-response-theory|Item Response Theory]]: the probit response model underlying preference estimation.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: distinguishes useful issue decomposition from a uniquely determined dimension count.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: a related construction using topic-weighted deviations from a general position.
- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: a related joint model with separate topic-specific bill coefficients, unlike the scalar discrimination used here.

## Related Papers

- [[papers/the-statistical-analysis-of-roll-call-data|The Statistical Analysis of Roll Call Data]]: cited Bayesian roll-call foundation and example of parsimonious latent scaling.
- [[papers/dimensions-issues-and-bills-appropriations-voting-on-the-house-floor|Dimensions, Issues, and Bills: Appropriations Voting on the House Floor]]: cited motivation for using substantive issue information when interpreting political dimensions.
- [[papers/tea-party-in-the-house-a-hierarchical-ideal-point-topic-model-and-its-application-to-republican-legislators-in-the-112th-congress|Tea Party in the House: A Hierarchical Ideal Point Topic Model and Its Application to Republican Legislators in the 112th Congress]]: a later library paper that cites this work as a foundation for topic-weighted issue positions.

[[index|Library home]]
