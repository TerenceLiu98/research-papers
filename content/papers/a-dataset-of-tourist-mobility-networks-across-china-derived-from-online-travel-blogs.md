---
title: A dataset of tourist mobility networks across China derived from online travel blogs
type: paper
authors:
  - Yunhao Zheng
  - Jinhua Wang
  - Yi Zhang
  - Naixia Mou
  - Yu Liu
year: 2026
tags:
  - tourism
  - human-mobility
  - network-datasets
---

## TL;DR

This Scientific Data descriptor releases eight directed, weighted attraction networks derived from Qunar travel blogs: a full network, four seasonal networks, and three travel-partner networks. The cleaned corpus contains 52,141 blogs, 22,621 attractions, and 407,668 visits. Edges measure consecutive recorded attraction visits, not population-level origin–destination flows.

## Research Question

Can structured travel blogs support a nationwide, reusable representation of tourist itineraries and their variation by season and travel companions?

## Motivation

Manual interpretation of travel narratives limits geographic scale. Qunar's structured POI references and trip metadata allow automated extraction without sophisticated narrative NLP, providing attraction-level evidence where authoritative mobility data are scarce.

## Contributions

- Eight networks with consistent CSV node and edge schemas.
- Derived visit sequences and POI records that permit alternative cleaning and network reconstruction.
- Temporal, geographic, and network-structure checks that characterize coverage and sampling limitations.

## Method

Blogs were retrieved January 1–11, 2022, with POI retrieval January 8–12. Structured webpage fields provide trip metadata and ordered attraction references. Cleaning restricts geography to China, removes duplicate blogs, collapses consecutive repeated attractions, and excludes itineraries with fewer than two attractions. The initial 82,604 blogs and 645,944 visits become 52,141 blogs and 407,668 visits (Table 2).

Each consecutive pair contributes one directed transition; its weight is the aggregate transition count. Nonconsecutive revisits such as A–B–A remain. This implements [[concepts/tourist-mobility-networks|Tourist Mobility Networks]] at attraction level.

Departure dates cover all retained blogs. Travel-partner metadata cover 35,579 blogs (68.24%): 8,231 family, 21,052 friends, and 6,296 solo. Seasonal subsets contain 13,100 spring, 15,108 summer, 13,856 autumn, and 10,077 winter blogs.

Node records include anonymized/encrypted identifiers, Chinese and translated English attraction and city names, and GCJ-02 coordinates. Edge records contain Source, Target, and Weight. Raw derived records retain single-attraction blogs and POI category labels. The descriptor says the sequence file has four columns but enumerates five, including Visit_Sequence; users should check the actual CSV schema.

## Experiments

This is a dataset validation study, not a predictive benchmark.

- **Coverage:** approximately 300 of 371 statistical cities are covered annually except 2011; 115 cities occur in every year. Seasonal coverage shows no systematic missing season outside early launch/stagnation periods.
- **External comparison:** city-level blog counts and official domestic-tourist statistics for 2011–2021 correlate at Pearson r = 0.548, p < 0.001. Rankings differ, including disproportionate blog prominence for Lijiang and Sanya.
- **Structure:** a denoised Louvain partition broadly follows provincial boundaries. Degree and edge-weight distributions are fitted with power laws; the authors interpret these as scale-free characteristics. These descriptive checks support plausibility, rather than establishing population representativeness.

## Limitations

Bloggers disproportionately represent leisure travel and particular platform users. Blog volume declines after 2015, so changes can reflect platform activity as well as tourism. Missing companion metadata restrict comparison across partner groups. Recorded itinerary order may omit actual movements. The data best support relative patterns and network structure, rather than absolute tourist counts or long-term demand trends.

GCJ-02 coordinates require coordinate-system reconciliation before integration with other geospatial sources. Translated names are aids rather than authoritative English labels. Original narrative webpages are not redistributed, and platform deterioration limits retrospective retrieval.

## Related Concepts

- [[concepts/tourist-mobility-networks|Tourist Mobility Networks]]: observed itinerary transitions define the graph and its interpretation.

## Related Papers

- Zheng et al. (2024), “Selection biases in crowdsourced big data applied to tourism research: An interpretive framework”: cited to explain differences between blog-based tourism evidence and official tourism statistics.
- Asero, Gozzo, and Tomaselli (2016), “Building Tourism Networks through Tourist Mobility”: cited conceptual precedent for representing tourist movements as networks.

## Data and Code

- Dataset: [Figshare, DOI 10.6084/m9.figshare.30184726](https://doi.org/10.6084/m9.figshare.30184726), CC BY 4.0.
- Reconstruction code: [Figshare, DOI 10.6084/m9.figshare.30148444](https://doi.org/10.6084/m9.figshare.30148444), MIT.

The supplied manuscript records acceptance on January 31, 2026 and copyright 2026, but leaves the publication date as a placeholder. No article DOI is supplied; the dataset DOI above is not an article identifier.
