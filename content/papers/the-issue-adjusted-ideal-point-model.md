---
title: The Issue-Adjusted Ideal Point Model
type: paper
authors:
  - Sean M. Gerrish
  - David M. Blei
year: null
source_job_id: "bac28d6c-f149-4b56-8b63-51880dac194c"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - topic-models
  - variational-inference
---

## TL;DR

Gerrish and Blei model legislative votes using a general ideal point plus issue-specific offsets weighted by bill content. Across the 106th-111th U.S. Congresses, the model yields small improvements in held-out vote log likelihood and reveals distinctive issue voting and stronger party separation on procedural matters. Direct subject labels are competitive with inferred topics. The model is primarily exploratory: the authors report little correlation with external sources in preliminary validation of issue positions.

This page describes the supplied manuscript titled *The Issue-Adjusted Ideal Point Model*, including Appendices A and B. The library's [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]] describes the same modeling approach but records different numerical results and source coverage. The supplied text does not establish their publication chronology; results here follow this manuscript alone. No publication year, venue, or stable identifier is supplied.

## Research Question

Can the issues discussed in bills explain systematic departures from legislators' general ideological positions while making multidimensional voting behavior substantively interpretable?

## Motivation

A single ideal-point ordering cannot capture legislators who consistently cross party lines on selected issues. Unrestricted multidimensional models accommodate such behavior but leave their axes difficult to interpret. [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]] connect additional dimensions directly to named issues encoded from legislative text.

## Contributions

- A logistic roll-call model combining a general position with sparse or nearly sparse issue adjustments.
- A two-stage representation of bills using Congressional Research Service (CRS) labels and topic mixtures estimated from text.
- Mean-field variational inference with sampled gradients and second-order updates, detailed in the appendices.
- Held-out vote comparisons and exploratory analyses of issue-specific deviations, procedural partisanship, and exceptional legislators.

## Method

### Voting and Issue Representation

For legislator $u$ and bill $d$, the model specifies

$$
\Pr(v_{ud}=\mathrm{yes})=
\sigma\left[a_d\left(x_u+\mathbf z_u^\top\boldsymbol\theta_d\right)+b_d\right],
$$

where $x_u$ is the general ideal point, $\mathbf z_u$ contains issue adjustments, $\boldsymbol\theta_d$ is the bill's estimated issue mixture, $a_d$ is polarity, and $b_d$ is popularity. Standard Normal priors regularize $x_u,a_d,b_d$; Laplace priors regularize offsets. Zero offsets recover the ordinary one-dimensional model. A bill entirely about issue $k$ gives an effective position $x_u+z_{uk}$. The meaning of an offset for a yes vote depends on bill polarity.

The authors retain 74 of 5,861 CRS labels, each attached to at least 25 bills. They initialize topic word distributions from tagged documents, smooth them with two unsupervised LDA iterations, and estimate document-level topic expectations. This is a simplified labeled-LDA procedure influenced by Ramage et al. (2009). Appendix B describes selection of 5,000 phrases of one to five words using frequency filters and a classifier trained with 458 manually selected negative phrases. The resulting topic expectations are fixed inputs to the voting model.

### Inference and Interpretation

A fully factorized Gaussian approximation represents positions, adjustments, and bill parameters. The algorithm estimates variational gradients by sampling; Appendix A adds quasi-Monte Carlo sampling and second-order updates. House and Senate models are fitted separately for each two-year Congress. Orientation is chosen so Republicans generally lie on the positive side of the scale.

To distinguish an exceptional legislator from a systematic issue-wide pattern, the authors regress offsets on general ideal points and examine the residual $\hat z_{uk}=z_{uk}-\beta_k x_u$, termed a corrected issue adjustment. They compare its absolute magnitude with counterparts obtained from 20 permutations of bill-topic assignments. This is an exploratory comparison with similarly positioned lawmakers, not an estimate of a causal issue effect.

## Experiments

### Held-Out Vote Prediction

GovTrack supplies roll calls and available bill texts for Congresses 106-111 (1999-2010). The introduction reports 1,203,009 votes; Figure 7 gives chamber-specific counts. Six-fold cross-validation holds out individual legislator-bill votes, so this tests missing-vote prediction on bills with other observed votes. Figure 11 reports average held-out log likelihood at $\lambda=1$; higher is better.

| Chamber | Congress | Traditional | Labeled LDA | Direct labels | Standard LDA | Permuted issues |
| --- | --- | --- | --- | --- | --- | --- |
| Senate | 106 | -0.209 | -0.208 | -0.208 | -0.208 | -0.210 |
| Senate | 107 | -0.209 | -0.209 | -0.209 | -0.210 | -0.210 |
| Senate | 108 | -0.182 | -0.181 | -0.182 | -0.184 | -0.183 |
| Senate | 109 | -0.189 | -0.188 | -0.189 | -0.189 | -0.203 |
| Senate | 110 | -0.206 | -0.205 | -0.206 | -0.207 | -0.211 |
| Senate | 111 | -0.182 | -0.180 | -0.181 | -0.181 | -0.186 |
| House | 106 | -0.168 | -0.167 | -0.167 | -0.171 | -0.167 |
| House | 107 | -0.154 | -0.151 | -0.151 | -0.154 | -0.155 |
| House | 108 | -0.096 | -0.095 | -0.094 | -0.097 | -0.096 |
| House | 109 | -0.120 | -0.118 | -0.117 | -0.121 | -0.122 |
| House | 110 | -0.090 | -0.089 | -0.088 | -0.091 | -0.090 |
| House | 111 | -0.077 | -0.076 | -0.075 | -0.078 | -0.077 |

Direct-label mixtures assign equal weight to each of a bill's labels. They match or outperform labeled LDA in every displayed House session, while labeled LDA matches or outperforms them in the Senate. Thus, the table supports issue conditioning but does not establish universal superiority of text-inferred mixtures. Labeled LDA improves on the traditional model except for a displayed tie in Senate 107. The five-permutation control generally performs worse; House 106 is tied with labeled LDA at the reported precision. The manuscript's claims of strict improvements should be read with these rounding limits.

Appendix A.3 recommends $1\leq\lambda\leq10$. Its House results worsen substantially at small penalties, reaching -0.159 for $\lambda=10^{-4}$ versus -0.119 for the traditional model. The sensitivity table and prose contain discrepancies, so they support a regularization sensitivity finding rather than a precise universal optimum.

### Exploratory Results

- In the 111th House, general ideal points from the two models correlate at 0.998. The adjusted model's general positions alone separate parties less sharply, but a linear discriminant using positions and offsets correlates with party at 0.979 versus 0.921 for traditional ideal points. A control with random added dimensions yields $0.933\pm0.004$ across 100 tests.
- All issues improve training log likelihood in the reported issue-weighted analysis, with the largest gains concentrated in procedural topics. Stronger party-specific procedural offsets are consistent with procedural cartel theory.
- Ron Paul's training accuracy increases from 83.8% to 87.9% in Section 5.2. Corrected offsets highlight his distinctive votes on international affairs, health, social issues, and congressional sessions.
- Donald Young's unusual votes on commemorations and landmark naming become visible despite an otherwise unremarkable general ideal point.

## Limitations

- The authors report little correlation with external sources in preliminary analyses of stated issue positions (Section 6). Predictive improvement therefore does not independently validate offsets as sincere preferences.
- Fixed topic estimates omit text-representation uncertainty; the factorized variational approximation omits posterior dependencies. Fitted offsets are conditional on the issue taxonomy and model.
- Bill polarity and popularity are inferred from votes. The experiment does not establish prediction on wholly unseen bills. Separate congressional fits also do not estimate longitudinal issue trajectories.
- Source inconsistencies limit exact replication: Appendix A.2 prints variance $\exp(5)$ despite discussing low variance, whereas A.3 states $\exp(-5)$; A.3 associates Congress 109 with both 1999-2000 and 2005-2006; its table prints positive average log probabilities at $\lambda=1000$, which cannot be valid log probabilities. These values are not silently corrected here.
- The introduction's vote total differs from the sum of Figure 7's rows, and Section 4.2 mentions 5.7 million unchanged predictions without reconciling that count with the corpus. Paul's earlier baseline accuracy is 80.0%, whereas the paired Section 5.2 comparison uses 83.8%. The parsed text also contains damaged equations.

## Related Concepts

- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: the central topic-conditioned extension of roll-call scaling.
- [[concepts/item-response-theory|Item Response Theory]]: the respondent-item framework behind the voting model.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: why one shared ordering can miss systematic issue voting.
- [[concepts/text-scaling-models|Text Scaling Models]]: a related use of political text; here text encodes bill issues while votes estimate legislator positions.

## Related Papers

- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: a closely overlapping manuscript in the library; its reported results should be kept distinct from this source's Figure 11.
- Gerrish and Blei (2011), *Predicting legislative roll calls from text*: cited work that predicts bill parameters from text, addressing a different prediction target.
- Ramage et al. (2009), *Labeled LDA: A supervised topic model for credit attribution in multi-labeled corpora*: cited inspiration for named topic representations.
- Cox and McCubbins (1993, 2005): cited accounts of party control of legislative procedure used to interpret procedural offsets.

[[index|Library home]]
