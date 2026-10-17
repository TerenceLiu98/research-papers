---
title: Group-based public opinion polarisation in multi-party systems
type: paper
authors:
  - Denise Traber
  - Lukas F. Stoetzer
  - Tanja Burri
year: 2023
venue: West European Politics
volume: 46
issue: 4
pages: "652-677"
doi: "10.1080/01402382.2022.2110376"
source_job_id: "1bb94548-84a0-440b-abc0-dd42699003ae"
tags:
  - political-polarization
  - public-opinion
  - item-response-theory
  - comparative-politics
---

## TL;DR

Traber, Stoetzer, and Burri measure group-based opinion polarization as dissimilarity between ideology distributions, combining hierarchical IRT estimates of group means and variances with Bhattacharyya distance. Their Swiss survey application finds increasing polarization from the 1990s to the mid-2000s followed by depolarization, despite continued elite polarization. Changing group sizes and internal heterogeneity help explain the measured trajectory; the data cannot distinguish individual ideological shifts from sorting into groups.

## Research Question

How can public opinion polarization in multiparty systems be measured while accounting for both ideological separation between social groups and coherence within them?

## Motivation

Cleavage research identifies politically mobilized social divisions, whereas public opinion research often tracks population-wide dispersion or partisan sorting. Neither aggregate variance nor differences between group means fully describe overlapping preference distributions. Two groups with unchanged mean positions can become less distinct as their internal heterogeneity increases. This motivates connecting [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]] to [[concepts/political-polarization|Political Polarization]].

## Contributions

- Defines group-based opinion polarization through the dissimilarity of ideology distributions, accommodating several parties and intersecting social identities.
- Combines hierarchical IRT with a distributional distance that incorporates group location and dispersion.
- Aggregates pairwise comparisons using group-size weights, making changes in group composition relevant to the overall measure.
- Applies the approach to Swiss partisan and education groups and compares it with absolute differences in group means.

## Method

The first step estimates latent ideology from policy-question responses using hierarchical [[concepts/item-response-theory|Item Response Theory]], following Zhou (2019). Covariates describe both the mean and variance of normally distributed latent ideology. Interactions between group indicators and time allow each group's location and dispersion to evolve. The application uses B-splines, selecting a parsimonious specification with the Bayesian information criterion. Estimation uses maximum likelihood; identification fixes scale orientation through a positive first-item discrimination, the overall latent mean to zero, and the geometric mean of prior variances to one (Note 5).

The second step computes Bhattacharyya distance between fitted group distributions. It is the negative logarithm of the Bhattacharyya coefficient: identical distributions have distance zero, and decreasing overlap produces larger distances. For normal distributions it can be calculated directly from their means and variances. Thus a comparison includes within-group dispersion rather than only differences in means. The supplied main text refers the closed-form expression to Online Appendix A.3.

To aggregate comparisons, the method weights each pairwise distance by the product of the groups' population shares and sums the weighted terms. Consequently, the aggregate can change when a group grows even if its ideological distribution stays fixed. The measurement section specifies group-size weights; the later results passage's phrase "weighted by group means" is inconsistent with that specification. Full aggregation details are referred to Online Appendix A.4.

## Experiments

### Swiss Survey Application

VoxIt surveys follow Swiss national ballots by two or three weeks, with approximately 1,000 respondents per survey. The analysis retains ten consistently asked policy questions covering topics including national defense, redistribution, gender equality, and environmental protection. Groups cross tertiary versus lower educational attainment with support for GPS, SP, CVP, FDP, and SVP; other parties, no identification, and nonresponses form an additional category.

The data section specifies 1993-2016, whereas the abstract and Figure 3 specify 1994-2016. The source does not resolve this discrepancy. The displayed distribution snapshots compare 1995, 2005, and 2015.

- Left-party supporters are more internally divided by education than SVP supporters. Tertiary-educated respondents generally occupy more leftward positions, especially within left parties.
- Comparisons with SVP supporters show the greatest polarization for supporters of left parties, particularly among tertiary-educated groups. FDP-SVP overlap remains comparatively high across education levels.
- The reported aggregate rises until the mid-2000s and then declines. The peak around 2004 coincides with an increase in the SVP supporter share from about 5% to 11% of the sample, which includes nonvoters. That share stabilizes after 2005.
- Subsequent depolarization accompanies modest rightward movements among other parties' supporters and increasing heterogeneity among SVP supporters. These are descriptive components of the fitted pattern, not separately identified causal effects.

### Measurement Comparison

Bhattacharyya distance and absolute group-mean differences correlate around 0.9 overall. Nevertheless, mean differences indicate more polarization in several 2015 comparisons, especially among lower-education left-party and SVP groups, whose distributions have widened. At the aggregate level, distributional distance indicates relatively low, stable polarization during 2010-2015, while mean differences indicate higher levels and a stronger increase after 2015.

The conclusion also reports a German application for 1990-2014 in Online Appendix C, consistent with earlier findings of depolarization. That appendix is absent from the supplied Markdown, so its estimates and implementation cannot be assessed here.

## Limitations

- Repeated cross-sectional data cannot distinguish changes in individuals' ideology from changes in group membership. The authors suggest panel data to separate shifts from sorting.
- The application summarizes ideology on one dimension and assumes normal group distributions. Multiple dimensions or separate issue areas could reveal divisions hidden by this summary.
- Group definitions and group-size weights affect the estimand. Changes in the aggregate do not necessarily imply changes in pairwise ideological separation.
- The proposed connection between cohesive opposing groups and conflict motivates the measure; the application does not test effects on mobilization, democratic consensus, or conflict.
- Online appendices containing detailed model specifications, spline comparisons, aggregation formulas, and additional applications are not included in the supplied source.

## Related Concepts

- [[concepts/group-preference-distribution-estimation|Group Preference Distribution Estimation]]: estimates the group means and dispersions compared by the measure.
- [[concepts/item-response-theory|Item Response Theory]]: links policy responses to latent ideology.
- [[concepts/political-polarization|Political Polarization]]: the broader construct, including ideological and affective forms.
- [[concepts/party-system-polarization|Party-System Polarization]]: elite party dispersion can follow a different trajectory from public opinion.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: determines which political divisions the latent scale can represent.

## Related Papers

- Zhou (2019), "Hierarchical Item Response Models for Analyzing Public Opinion": cited methodological basis for modeling group means and variances.
- [[papers/dynamic-estimation-of-latent-opinion-using-a-hierarchical-group-level-irt-model|Dynamic Estimation of Latent Opinion Using a Hierarchical Group-Level IRT Model]]: cited related approach to group-based latent opinion estimation.
- Bhattacharyya (1946), "On a Measure of Divergence between Two Multinomial Populations": cited source for the distributional comparison.
- [[papers/a-group-based-approach-to-measuring-polarization|A Group-Based Approach to Measuring Polarization]]: related library reading that uses variance decomposition to capture between-group separation and within-group cohesion; not cited in this article.

Source: [Article DOI](https://doi.org/10.1080/01402382.2022.2110376). The issue citation is dated 2023; online publication was September 29, 2022.

[[index|Library home]]
