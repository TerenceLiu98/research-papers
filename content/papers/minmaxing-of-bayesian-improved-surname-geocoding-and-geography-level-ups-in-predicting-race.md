---
title: "Minmaxing of Bayesian Improved Surname Geocoding and Geography Level Ups in Predicting Race"
type: paper
authors:
  - Jesse T. Clark
  - John A. Curiel
  - Tyler S. Steelman
year: 2022
doi: "10.1017/pan.2021.31"
tags:
  - race-estimation
  - geographic-aggregation
---

## TL;DR

Georgia voter-file validation finds ZIP-code BISG comparable to census tracts for aggregate racial-count estimation without address geocoding. Blocks improve Asian and Hispanic estimates, while White and Black estimates are similar across ZIP codes and blocks.

## Research Question

When does finer geography improve BISG enough to justify geocoding costs and missingness?

## Motivation

Applications use widely varying geographic resolutions. Address geocoding takes time and leaves unmatched records; ZIP codes supply demographic context already present in many administrative records.

## Contributions

The authors introduce ZIP-code estimation through zipWRUext, compare five geographic approaches, and recommend choosing geographic precision according to the groups studied and the costs of geocoding.

## Method

The Georgia voter file contains 7,346,219 records and 3,123,112 unique addresses. The study compares surname-only, county, ZIP-code, tract, and block estimates. ZIP-code estimates use 2010 census and 2018 ACS demographics; ESRI 2013 street and postal address geocoders supply tract and block locations.

For 10,000 bootstrap draws of 1,000 voters, the authors compare self-reported group counts with summed BISG probabilities for White, Black, Hispanic, Asian, and other categories. Absolute count errors evaluate aggregate composition, rather than individual classification accuracy.

## Experiments

Section 3 reports these differences in median errors per 1,000 sampled voters, preserving the reported signs:

| Group | ZIP minus block | ZIP minus tract |
| --- | ---: | ---: |
| White | -1.22 | -0.15 |
| Black | 1.54 | 0.12 |
| Asian | 9.21 | 0.05 |
| Hispanic | 23.35 | 4.81 |

ZIP codes and tracts are substantively comparable, while blocks improve Asian and Hispanic count estimates. Counties underperform ZIP codes. Geocoding and associated processing took 7.28 hours. Geocoding failed for 4.6% of addresses; unavailable ZIP codes affected 2,065 voters, or 0.03% of records. These percentages have different denominators.

## Limitations

One-state validation may not transfer to populations with different segregation or demographic composition. Geographic aggregation can introduce the modifiable areal unit problem. Fluid racial identities and distinctions among race, ethnicity, and nationality complicate validation against self-reports. Aggregate count performance does not establish reliable individual labels.

The supplied Markdown omits numbered footnote text and supplementary tables, preventing reconstruction of detailed missing-data handling and supplementary diagnostics. Processing costs depend on the implementation and hardware.

## Related Concepts

- [[concepts/bayesian-improved-surname-geocoding|Bayesian Improved Surname Geocoding]] is extended with ZIP-code demographics.
- [[concepts/modifiable-areal-unit-problem|Modifiable Areal Unit Problem]] concerns sensitivity to geographic aggregation.
- [[concepts/name-based-demographic-inference|Name-Based Demographic Inference]] supplies the surname signal supplemented by geography.

## Related Papers

- [[papers/validating-the-applicability-of-bayesian-inference-with-surname-and-geocoding-to-congressional-redistricting|Validating the Applicability of Bayesian Inference with Surname and Geocoding to Congressional Redistricting]] subsequently evaluates ZIP-based probability aggregation for electoral geography.
- Imai and Khanna (2016), “Improving Ecological Inference by Predicting Individual Ethnicity from Voter Registration Record,” provides the wru framework extended here.

## Source and Replication

*Political Analysis* 30 (2022), 456–462; published online 29 November 2021. DOI: 10.1017/pan.2021.31. Replication DOI: 10.7910/DVN/IH7ICK; identifying information is redacted. Based on the supplied parsed Markdown for Cognitio job 28d0b8cd-28b8-40a4-aba7-5bbb3bf43b34.
