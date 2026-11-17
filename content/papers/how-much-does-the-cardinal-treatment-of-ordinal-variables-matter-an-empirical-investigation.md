---
title: "How Much Does the Cardinal Treatment of Ordinal Variables Matter? An Empirical Investigation"
type: paper
authors:
  - Jefrey R. Bloem
year: 2022
doi: 10.1017/pan.2020.55
tags:
  - ordinal-measurement
  - partial-identification
  - sensitivity-analysis
---

## TL;DR

Bloem evaluates how regression conclusions change when ordinal outcomes receive alternative order-preserving numerical scores. Re-estimating models across specified transformation families yields conditional effect sets: the negative slave-trade–trust association retains its sign, but statistical significance is less uniformly stable. Supplemental applications show greater sensitivity in well-being and test-score research.

## Research Question

How sensitive are the sign, magnitude, and statistical significance of empirical estimates to treating an ordinal dependent variable as cardinal, particularly in specifications with multiple covariates?

## Motivation

Ordered categories establish rank without establishing equal distances. Assigning consecutive integers therefore adds a measurement assumption. Existing sign-robustness conditions for mean comparisons and bivariate regressions do not fully address effect sizes, precision, or richer specifications.

## Contributions

- A practical partial-identification approach that re-estimates the original specification over parameterized monotone transformations.
- Separate assessment of coefficient sign, magnitude, and statistical significance.
- A framework for narrowing transformation ranges using substantive evidence about the reporting function.

## Method

The method implements [[concepts/ordinal-scale-sensitivity-analysis|Ordinal-Scale Sensitivity Analysis]] in three steps: choose a broad transformation family, estimate effects and confidence intervals throughout that family, and assess a narrower plausible range if conclusions are sensitive.

For an outcome ranging from zero to its maximum, the power family is

$$
T_\sigma(Y)=Y_{\max}(Y/Y_{\max})^\sigma,\qquad \sigma>0.
$$

Values below one imply concavity, one reproduces the original scoring, and values above one imply convexity. The initial empirical range is $[0.1,10]$. A second family uses scaled CDF transformations centered at the scale midpoint, varying from nearly step-shaped to approximately linear. The original controls and estimation strategy are retained while the outcome changes (§3).

The resulting bounds depend on the chosen family and plausibility restrictions; they are not exhaustive bounds over all increasing transformations. Plotting transformation shapes makes those restrictions interpretable.

## Experiments

The main illustration revisits Nunn and Wantchekon (2011), using five Afrobarometer trust outcomes scored 0–3. The main-text analysis uses distance from the ethnic group's historical location to the coast as an instrument for slave-trade exposure, with country fixed effects and individual, district, and ethnic-group controls. Figures report 95% confidence intervals with ethnicity-clustered standard errors.

- **Power transformations:** All five estimated effects remain negative. Three remain statistically significant throughout; local-council and intergroup trust lose significance for some convex transformations.
- **CDF transformations:** All five retain their sign. The text identifies one near-step-function significance exception, but inconsistently names its outcome; Figure 5's caption labels Panel A as trust of relatives.
- **Magnitude:** For neighbors' trust, the model explains 4.2%–5.4% of variation across power transformations, with slave exports accounting for roughly 16% of that explained variation.
- **Supplemental applications summarized in §4.2:** For creative destruction and well-being, restricting the power parameter to $[0.4,2.5]$ still produces effects ranging from small and insignificant to significant and almost 50% larger than originally reported. For test-score gaps, $[1,5]$ largely preserves Bond and Lang's finding of scale sensitivity. These are the article's summaries; the supplied Markdown does not include the supplemental tables.

## Limitations

Plausibility restrictions require application-specific judgment. Stability within the tested families does not establish invariance to every admissible scoring rule. Transformation-specific confidence intervals describe sampling uncertainty conditional on a scoring rule; they should not be conflated with uncertainty about which rule is appropriate. Measurement robustness also does not independently validate the instrumental-variable assumptions. The supplied source contains inconsistent outcome labels in its discussion of Figure 5, so the exceptional outcome cannot be attributed unambiguously from that paragraph alone.

## Related Concepts

- [[concepts/ordinal-scale-sensitivity-analysis|Ordinal-Scale Sensitivity Analysis]]: the paper's central measurement-robustness problem and workflow.
- [[concepts/item-response-theory|Item Response Theory]]: item-level evidence informs plausible curvature between observed test scores and latent learning in the supplemental discussion.

## Related Papers

- Nunn and Wantchekon (2011), “The Slave Trade and the Origins of Mistrust in Africa”: primary empirical application.
- Schröder and Yitzhaki (2017), “Revisiting the Evidence for Cardinal Treatment of Ordinal Variables”: sign-robustness conditions motivating the extension to richer specifications.
- Bond and Lang (2019), “The Sad Truth About Happiness Scales”: related concerns about latent-scale transformations, distinguished here from transformations of observed category scores.

Published in *Political Analysis* 30, 197–213 (2022); first published online 26 February 2021. Replication identifiers reported by the article: DOI 10.24433/CO.2966972.v1 and DOI 10.7910/DVN/VWURHG.
