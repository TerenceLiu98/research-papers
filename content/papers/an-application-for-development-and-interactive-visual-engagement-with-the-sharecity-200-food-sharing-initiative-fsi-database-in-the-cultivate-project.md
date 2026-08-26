---
title: "An Application for Development and Interactive Visual Engagement with the SHARECITY 200 Food Sharing Initiative (FSI) Database in the CULTIVATE Project"
type: paper
authors:
  - Anastasiia Potyagalova
  - Hyunji Cho
  - Ivan Bacher
  - Hao Wu
  - Patricia Bufini
  - Anna R. Davies
  - Gareth J. F. Jones
year: 2026
doi: "10.1145/3773966.3779409"
venue: "WSDM 2026"
pages: 4
tags:
  - food-sharing
  - information-retrieval
  - web-crawling
  - llm-classification
  - sustainability
  - geospatial-data
---

## TL;DR

The CULTIVATE system builds and maintains the SHARECITY 200 database of Food Sharing Initiatives (FSIs) across 200 predominantly European cities. It combines multilingual query construction, search expansion, focused web retrieval, LLM-based filtering and categorization, manual verification, and an interactive geospatial map. The paper is a system demonstration and does not report a quantitative benchmark of retrieval, classification, or map usability.

## Research Question

How can distributed, multilingual online information about urban Food Sharing Initiatives be discovered, classified, verified, maintained, and presented through an accessible interactive database and map?

## Motivation

FSIs such as surplus-food redistribution, community gardens, seed swaps, and shared meals are widespread but difficult to compare because their information is dispersed across websites, social platforms, languages, and formats. Mapping these activities manually is labor-intensive and can miss grassroots groups whose descriptions do not use standardized terminology. CULTIVATE addresses this discovery and maintenance problem by turning scattered online traces into a curated city-level resource.

## Contributions

- Presents the CULTIVATE pipeline for constructing and sustaining the SHARECITY 200 FSI database across 200 predominantly European cities.
- Uses the Multilingual European Food Sharing Dictionary, native-speaker review, query expansion, and focused search to improve discovery across languages and local terminology.
- Combines LLM-based candidate filtering and categorization with URL blacklisting, web scraping, geolocation, and final manual verification.
- Provides an interactive Food Sharing Map that exposes the curated initiatives and their activities, sharing methods, locations, and social links.
- Describes a reusable information-retrieval and LLM-classification framework that could be adapted to other domains with distributed online information.

## Method

The search component creates city- and language-specific queries from the Multilingual European Food Sharing Dictionary and related terminology. Native speakers verify and extend the queries. Google Custom Search API results are merged into a candidate URL set, then expanded with Okapi term expansion, YAKE keyword extraction, and LLM-based query expansion using GPT-4.

Candidate URLs pass through a blacklist for domains and content types such as commercial sites, PDFs, news sources, tourist guides, and podcasts. A BeautifulSoup-based scraper extracts text from the result page and relevant pages such as `about-us` or `our-story`. Llama 2 and GPT-4 classifiers then use role, narrative, and query prompts, with task examples and rejection criteria, to identify likely FSIs. The system uses manually mapped SHARECITY-100 records for task-specific adaptation.

Filtered initiatives are categorized by Food Sharing Activity, such as growing, cooking and eating, or distribution, and by Sharing Method, such as gifting, collecting, bartering, or selling. The structured output records the initiative name, city and country, social links, geolocation coordinates, and the activity and sharing-method attributes. Workers manually verify candidates before final inclusion. Periodic re-crawls identify new initiatives and check whether existing ones remain active.

## Experiments

This demonstration paper does not report a held-out retrieval or classification benchmark, ablation study, or quantitative user evaluation. Its reported system scope is the 200-city SHARECITY 200 database, with multilingual query resources covering 25 languages. The evaluation-facing artifact is the interactive Food Sharing Map, where each curated initiative is represented as a map point and can be inspected by demonstration attendees.

## Limitations

The paper does not provide precision, recall, coverage, error analysis, or usability estimates, so the effectiveness of the individual retrieval and classification components cannot be compared quantitatively from this report. Automated discovery remains vulnerable to false positives and missed initiatives, which is why manual verification is retained. Coverage also depends on web visibility, search-engine results, blacklist rules, the quality of local terminology, and the languages supported by the dictionary and queries. The database is dynamic, and the paper describes planned expansion to additional cities and a possible external request service rather than reporting those extensions as completed results.

## Related Concepts

- [[Food Sharing Initiatives]]
- [[LLM-Assisted Web Retrieval]]
- Focused crawling
- Multilingual information retrieval
- Human-in-the-loop data curation
- Geospatial visualization

## Related Papers

- Wu, Cho, Davies, and Jones (2024), "LLM-based Automated Web Retrieval and Text Classification of Food Sharing Initiatives." [DOI](https://doi.org/10.1145/3627673.3680090)
- Phelan, Davies, and Gomboli (2023), "The European Food Sharing Dictionary." [DOI](https://doi.org/10.5281/zenodo.10160274)
- Campos et al. (2020), "YAKE! Keyword extraction from single documents using multiple local features."
- Hou et al. (2023), "PromptBoosting: Black-box text classification with ten forward passes."
- Jagerman et al. (2023), "Query expansion by prompting large language models." [arXiv](https://arxiv.org/abs/2305.03653)
- Chae and Davidson (2023), "Large language models for text classification: From zero-shot learning to fine-tuning."


[[index|Library home]]
