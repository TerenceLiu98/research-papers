---
title: "The PARTYPRESS Database: A new comparative database of parties' press releases"
type: paper
authors:
  - Cornelius Erfort
  - Lukas F. Stoetzer
  - Heike Klüver
year: 2023
doi: "10.1177/20531680231183512"
journal: "Research & Politics"
pages: 1-7
tags:
  - party-issue-agendas
  - political-communication
  - text-classification
  - comparative-politics
---

## TL;DR

PARTYPRESS provides 269,418 press releases from 68 political parties in nine European countries from 2010 onward, with issue classifications derived from country-specific hand-coded samples and supervised learning. Its application to immigration communication expands an earlier three-country study and finds that radical-right attention to immigration is associated with mainstream-party attention in the pooled sample, but that this relationship varies substantially across countries.

## Research Question

How can researchers measure [[Party Issue Agendas|party issue agendas]] frequently and comparably across countries and electoral cycles, and what does such a resource reveal about dynamic party competition?

## Motivation

Election manifestos and expert surveys measure party priorities only intermittently, usually around elections. Speeches, parliamentary activity, news, social media, and press releases permit more frequent measurement, but collecting and classifying these sources has often limited research to individual parties or countries. Press releases are especially useful because party organizations choose their timing and content without being constrained by a parliamentary agenda, although their use requires substantial archival and text-classification work.

## Contributions

- Introduces PARTYPRESS, a public comparative database containing 269,418 press releases from 68 parties in Austria, Denmark, Germany, Ireland, the Netherlands, Poland, Spain, Sweden, and the United Kingdom from 2010 onward.
- Supplies document-level data and weekly and monthly aggregates, with issue labels organized in a 21-category scheme that adapts the Comparative Agendas Project codebook and includes non-thematic and other labels.
- Compares five supervised classifiers, an ensemble, and Transformer models using out-of-sample evaluation, and uses a multilingual Transformer to produce the database's main issue estimates.
- Demonstrates the database through a larger cross-national replication of research on whether radical-right parties shape mainstream parties' attention to immigration.

## Method

The authors collected party press releases primarily from party and parliamentary-group websites using source-specific web scrapers. When public archives were unavailable, they requested records from party offices and political archives or worked with country specialists. Each country's random hand-coded sample contains roughly 2,400 to 3,500 releases. Trained native speakers applied a codebook based on the Comparative Agendas Project; overall intercoder reliability was Krippendorff's alpha of 0.707, with variation across countries and issue categories.

Five supervised machine-learning classifiers, their ensemble, and Transformer models were evaluated with five-fold cross-validation. Each fold used 80% of the labeled data for training and 20% for testing, so documents were not evaluated by a model trained on them. The authors selected the multilingual Transformer for the downstream application because it performed best in their evaluation. Issue attention is measured by aggregating the share of releases assigned to an issue within a period.

The application follows Gessler and Hunger's dynamic analysis of immigration attention using an Arellano-Bond model. It extends the comparison beyond Austria and Germany to Denmark, the Netherlands, Poland, Sweden, and the United Kingdom; Ireland and Spain are excluded because the sample period contains no radical-right party in those countries.

## Experiments

The immigration replication contains 2,362 party-month observations from 46 parties, compared with 646 observations from 14 parties in the original study. For the 504 matched party-month observations in Austria and Germany, the PARTYPRESS and original immigration-salience measures correlate at 0.7263.

In the pooled model, greater radical-right immigration attention is positively associated with mainstream-party attention. The contemporaneous association is statistically significant in Austria, Germany, Poland, and Sweden; the Netherlands shows a significant one-month lag. Denmark and the United Kingdom show no evidence of such a response. In Austria, a one-percentage-point increase in radical-right immigration releases corresponds to an estimated 0.21-point increase among other parties, compared with 0.32 points in the original study. These heterogeneous results qualify any general claim that radical-right parties uniformly set other parties' immigration agendas.

An additional analysis applies the same general argument to environmental attention and Green parties. Other parties respond to increased Green-party environmental attention only in Germany and Ireland, not consistently across the remaining countries. The paper also reports that multilingual transfer could lower the labeling burden for future country additions: simulations reach about 70% accuracy with 250 hand-coded releases from a new country.

## Limitations

Coverage differs across parties, and low release counts indicate that some archives are incomplete. Missingness may be systematic if parties remove releases on particular issues or if some periods omit particular topics, so observed issue shares need not represent the complete population of party communication. The database covers nine countries from 2010 onward, and adding a new country still requires a hand-coded sample.

The primary labels capture issue focus rather than reliable issue-specific positions. Although coders also recorded positions, selective communication leaves some positions too sparsely represented for straightforward classification. The application establishes cross-national heterogeneity in agenda responses but does not identify the institutional or political conditions responsible for it.

## Related Concepts

- [[Party Issue Agendas]]
- Political agenda-setting
- Issue ownership
- Supervised text classification

## Related Papers

- Gessler and Hunger (2022), ["How the refugee crisis and radical right parties shape party competition on immigration"](https://doi.org/10.1017/psrm.2021.64).
- Sagarzazu and Klüver (2017), "Coalition governments and party competition: Political communication strategies of coalition parties."
- Grimmer (2010), "A Bayesian hierarchical topic model for political texts: Measuring expressed agendas in Senate press releases."
- Barbera et al. (2021), ["Automated text classification of news articles: A practical guide"](https://doi.org/10.1017/pan.2020.8).
