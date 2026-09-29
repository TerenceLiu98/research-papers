---
title: Topic-Factorized Ideal Point Estimation Model for Legislative Voting Network
type: paper
authors:
  - Yupeng Gu
  - Yizhou Sun
  - Bingyu Wang
  - Ning Jiang
  - Ting Chen
year: null
source_job_id: "d21a3288-dc6c-486f-8322-5ce59b07d0fb"
tags:
  - ideal-point-estimation
  - legislative-behavior
  - topic-models
---

## TL;DR

TF-IPM jointly estimates bill topics and topic-specific parameters for legislators and bills from text and roll-call votes. The authors report better held-out vote prediction than one-dimensional, unrestricted multidimensional, and issue-adjusted ideal-point baselines. A separate experiment withholding all votes on 10% of bills reports 80.8% accuracy using text to predict bill parameters. Topic interpretations remain exploratory, and exact baseline comparisons are presented graphically rather than numerically in the supplied text.

## Research Question

Can jointly learning bill topics and topic-specific voting positions improve prediction while giving substantive meaning to the dimensions of a multidimensional ideal-point model?

## Motivation

A single ideological ordering can conceal differences across policy areas, while unrestricted latent dimensions are difficult to label. Earlier [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]] use pre-estimated bill topics and deviations from a general position. TF-IPM instead learns topic-specific legislator and bill parameters and lets votes influence the topic representation itself.

## Contributions

- Introduces [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]] in a joint model of bill words and observed votes.
- Alternates updates of voting parameters and topic parameters under a regularized objective.
- Compares predictive performance on U.S. congressional data, illustrates issue-specific positions, and demonstrates prediction for bills without observed votes.

## Method

For legislator $u$, bill $d$, and topic $k$, let $x_{uk}$ denote a legislator position, $a_{dk}$ a bill's topic-specific coefficient, $\theta_{dk}$ its topic proportion, and $b_d$ its popularity intercept. Equation 2 defines

$$
\Pr(v_{ud}=1)=\operatorname{logistic}\left(\sum_{k=1}^{K}\theta_{dk}x_{uk}a_{dk}+b_d\right).
$$

The paper calls $a_{dk}$ a bill ideal point; operationally it multiplies the legislator position in the voting logit. Missing links, encoded as zero, are excluded rather than modeled as no votes.

The text component is a PLSA-style mixture, $p(w\mid d)=\sum_k\theta_{dk}\beta_{kw}$. The objective weights average text log likelihood by $1-\lambda$ and average observed-vote log likelihood by $\lambda$, with an L2 penalty on $X$ and $A$ corresponding to zero-mean Gaussian priors of standard deviation $\sigma$. Shared topic proportions connect the two components.

Optimization alternates gradient updates for $X,A,b$ with topic updates. An EM lower bound handles latent word-topic assignments, a multinomial-logit parameterization enforces the simplex constraint on $\theta_d$, and normalized expected word counts update $\beta$. A line search adjusts the gradient step size. The observed convergence curves do not establish global optimality.

For an unseen bill, Section 4.4 infers topic proportions using learned word distributions and fits linear regression from bag-of-words features to learned bill parameters on training bills. The resulting bill parameters and existing legislator positions yield vote probabilities. The regression-target notation is corrupted in the supplied Markdown; this description follows the surrounding prose and final voting equation.

## Experiments

### Data and Setup

The authors collect THOMAS House and Senate roll calls from 1990-2013, retaining bills with text and the latest available version. After stop-word removal, the vocabulary contains the 10,000 most frequent distinct words.

| Quantity | Reported value |
| --- | ---: |
| Legislators | 1,540 |
| House representatives | 1,299 |
| Senators | 241 |
| Distinct bills | 7,162 |
| Observed votes | 2,780,453 |
| Bills voted on in both chambers | 564 |

The main evaluation randomly holds out 10% of votes, using 90% for training. Baselines are 1-IPM, H-IPM, and IA-IPM. Multidimensional models use the same topic count, with $K=10$ in the default setting. TF-IPM uses $\lambda=0.8$; the authors apply the same regularization setting, $\sigma=22.4$, across methods. Metrics are probability RMSE, accuracy at a 0.5 threshold, and average vote log likelihood.

### Reported Findings

- **Held-out votes:** Figures 7-8 and the accompanying discussion report that H-IPM fits training data best, while TF-IPM generalizes better across the three evaluation metrics. Exact plotted metric values are not transcribed in the supplied Markdown, so no numerical margins are asserted here.
- **Sensitivity:** Increasing the number of topics causes overfitting in most models. Very large voting weight $\lambda$ also worsens test performance. Performance becomes less sensitive as the prior standard deviation grows. The parameter studies evaluate test-set performance directly.
- **Unseen bills:** With 90% of bills for training and all votes withheld on the remaining 10%, the text-based extension achieves **80.8% accuracy**. This is a separate split from the main missing-vote evaluation; Section 4.4 does not supply a numerical baseline comparison or uncertainty interval.
- **Interpretation:** Topic word lists and examples involving Ron Paul, Barack Obama, and Joe Lieberman illustrate differences across issues. These are qualitative plausibility checks rather than independent validation of latent preferences.

## Limitations

- Random vote holdout assesses interpolation within the observed legislative network, not forecasting a future Congress. The bill holdout experiment addresses a different prediction target but is not described as chronological.
- Missing votes and participation are not modeled. Selection of bills with available text limits coverage, and using the latest bill version does not demonstrate a forecast using only information available at voting time.
- Legislator parameters are static over the pooled period. The model does not estimate ideological change across 1990-2013.
- Topic labels aid interpretation but do not establish a common calibrated scale across topics. As a mathematical implication of Equation 2, simultaneously reversing $x_{uk}$ and $a_{dk}$ for one topic leaves predictions and the L2 penalty unchanged; orientation still needs a convention.
- Sensitivity studies use the testing data, and the supplied text does not describe a separate validation split. The unseen-bill result lacks repeated-split uncertainty and a reported comparator in that experiment.
- A background-word extension is discussed but excluded from the reported comparisons. Claimed gains from that extension are therefore not quantified here.
- Source quality limits replication: the parsed derivative with respect to $x_{uk}$ is inconsistent with the voting equation, and the unseen-bill regression notation is severely corrupted. The case-study prose also names topic pairs that disagree with the scatterplot captions. These details are not silently reconstructed.
- Publication year, venue, and stable identifiers are absent from the supplied Markdown. The year is left null rather than inferred from the data window or bibliography.

## Related Concepts

- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: jointly learned topics and topic-specific voter-bill interactions.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: the predecessor's global position plus topic-weighted deviations.
- [[concepts/item-response-theory|Item Response Theory]]: latent actor and bill parameters connected by a response probability.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: whether issue-specific positions require more than one ideological ordering.

## Related Papers

- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: cited as Gerrish and Blei (2012), reference 7; the direct predecessor and IA-IPM baseline. TF-IPM changes both the voting parameterization and the joint estimation of topics.
- Gerrish and Blei (2011), "Predicting legislative roll calls from text": cited text-based roll-call predecessor, reference 6.
- Hofmann (1999), "Probabilistic latent semantic analysis": cited basis for the text mixture and EM updates, reference 10.
- Wang and Blei (2011), "Collaborative topic modeling for recommending scientific articles": cited related combination of text and user-item behavior, reference 21.

[[index|Library home]]
