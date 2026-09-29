---
title: "Who uses AI in research, and for what? Large-scale survey evidence from Germany"
type: paper
authors:
  - Marina Chugunova
  - Dietmar Harhoff
  - Katharina Hölzle
  - Verena Kaschub
  - Sonal Malagimani
  - Ulrike Morgalla
  - Robert Rose
year: null
doi: "10.1016/j.respol.2025.105381"
tags:
  - ai-adoption
  - research-practice
  - survey-research
  - gender-inequality
---

## TL;DR

An anonymous June 2024 survey of 6,215 researchers at Germany's Max Planck Society and Fraunhofer Society documents AI use across core research tasks: 25.9% report using it for research at least daily. Familiarity is strongly associated with the observed gender gap in use, while only 21.0% of respondents attempting a prompting task succeed. These findings describe [[concepts/ai-adoption-in-research|AI Adoption in Research]]; they do not establish productivity gains or causal effects of training and institutional support.

## Research Question

Who uses AI in research, for which tasks, and how are use, prompting performance, perceived benefits, demographic differences, and organizational conditions related?

## Motivation

Publication and code records miss uses such as ideation, research management, and exploratory analysis. Surveying employees across two organizations captures these activities and includes early-career researchers who may not yet have substantial publication records. The organizations share a national context but differ in mission: fundamental research at Max Planck and applied research at Fraunhofer.

## Contributions

- Documents AI familiarity, frequency of use, task allocation, perceived barriers, and expectations in a large research workforce sample.
- Examines demographic and work-role differences, including a decomposition of the gender gap in research use.
- Combines self-reports with a narrow performance measure of prompting ability.
- Identifies associations with learning resources and organizational climate that motivate future intervention studies.

## Method

All employees of both societies were invited to an anonymous survey in June 2024, with collection spanning one month. The analysis uses 6,215 complete researcher responses, a 20.5% response rate. Administrative comparisons suggest modest demographic differences from the two organizational populations. Natural sciences and engineering dominate; 54.8% report interdisciplinary work.

The survey covers AI broadly, not exclusively generative AI, and does not identify particular tools. Regression controls include education, gender, age group, broad research field, work experience, and affiliation. The authors use a significance threshold of p <= 0.005. K-means clustering of task-time allocation distinguishes leaders, builders, and analysts. A Blinder-Oaxaca decomposition examines the gender gap in use; this is a descriptive decomposition, not a causal mediation design.

For the prompting task, respondents saw a picture and wrote a prompt intended to identify its depicted phenomenon. A local LLM received each prompt ten times. Success required at least one response naming the phenomenon, or a prompt mentioning uploading the picture. Blank responses, 19.5% of the sample, were excluded. Figure 3 reports 5,002 prompting observations and 6,037 responses to the learning-resource question. This test is distinct from the broader knowledge and reflective judgment covered by [[concepts/algorithm-literacy|Algorithm Literacy]].

## Experiments

### Survey Findings

This is an observational survey with an embedded prompting assessment, not a randomized adoption or training experiment. Values below are reported in Section 3 and the figure captions.

| Measure | Reported result |
| --- | --- |
| Very or rather familiar with AI | 42.4% |
| Research use at least daily | 25.9% |
| Never use AI for work, including research, teaching, or service | 22.2% |
| Task uses | Piloting/testing 47.9%; coding 43.2%; manuscript writing 32.9%; literature reviews 31.5% |
| Expect AI to transform or revolutionize their field within a decade | 69.2% |
| Successful prompting among attempts | 21.0% |
| Successful prompting among those engaging with learning resources | 31.0% |
| Barriers cited among respondents' top two | Legal uncertainty 17.6%; lack of knowledge 17.4%; lack of suitable tools 16.6% |

Older respondents report lower familiarity and use without greater skepticism; familiarity and use rise with educational attainment. The task-based leader cluster reports greater familiarity, more frequent use, and more optimistic expectations than builders and analysts, conditional on controls. These clusters are inferred from time allocation, not verified job titles.

### Gender, Familiarity, and Prompting

The text reports that familiarity accounts for 71% of the explained gender gap and 99% of the total gap in the decomposition (Table A8). These are different denominators and should not be treated as causal shares. Among AI users, perceived helpfulness does not differ significantly by gender. Women are less likely than men to cite distrust as a leading barrier, while lack of knowledge is their most common reported barrier.

Prompt success is 18.1% for women and 22.1% for men overall (reported p = 0.005). Among respondents familiar with AI, the rates are 19.5% and 22.2% (p = 0.01), which does not meet the paper's stricter significance threshold. Resource engagement, familiarity, and use correlate with prompting success, but neither training nor experience is randomized.

### Organizational Context

Continuous learning orientation is the organizational-climate dimension consistently associated with both familiarity and adoption. Perceived regulation is associated with more frequent research use overall, but the text reports a different pattern for women. Perception is not verified policy exposure: 26% believe their society has AI regulations although the authors state that no society-level regulations existed at the survey date. Respondents most often seek guidance from supranational institutions (58.7%), followed by research societies (51.3%) and professional associations (49.0%).

## Limitations

- Cross-sectional associations cannot establish whether familiarity, resource engagement, or institutional climate causes adoption. Use may also change familiarity and perceived helpfulness.
- Voluntary participation permits self-selection despite organizational endorsement and demographic comparisons. Two German organizations do not represent all disciplines, institutions, or national settings.
- Self-reported helpfulness and expectations are not objective measures of research quality, productivity, innovation, or skill development. Aggregated AI responses cannot identify tool-specific effects.
- The prompting test measures one noninteractive task with a lenient success rule and excludes non-attempts. It is not a general benchmark of research competence or real-world AI proficiency.
- Comparisons with a separate 2023 survey involve different samples and partly different questions; they are not longitudinal estimates of adoption growth.
- The supplied Markdown omits the supplementary tables, survey instrument, and footnote details, including the local LLM specification. Table-based results above follow the main text and cannot be independently checked here. Some statistical symbols are corrupted, so the ambiguous prompting-regression coefficient is not reproduced.
- The authors state that they lack permission to share the data. The publication year is not explicitly given in the supplied text and remains unset; the DOI is reproduced from its supplementary-material statement without inferring a year from the identifier.

## Related Concepts

- [[concepts/ai-adoption-in-research|AI Adoption in Research]]: distinguishes access, familiarity, use, proficiency, and measured outcomes.
- [[concepts/algorithm-literacy|Algorithm Literacy]]: distinguishes understanding and critical evaluation from reported familiarity or a single prompting score.

## Related Papers

- Van Noorden and Perkel (2023), "AI and science: What 1,600 researchers think": the cited earlier researcher survey used for descriptive comparisons.
- Humlum and Vestergaard (2025), "The unequal adoption of ChatGPT exacerbates existing inequalities among workers": cited evidence on unequal workplace adoption.
- Carvajal, Franco, and Isaksson (2024), "Will artificial intelligence get in the way of achieving gender equality?": the cited source of the prompting task and a comparison for gendered adoption patterns.
- [[papers/scaling-laws-for-economic-productivity-experimental-evidence-in-llm-assisted-translation|Scaling Laws for Economic Productivity: Experimental Evidence in LLM-Assisted Translation]]: a complementary Wiki comparison, not a citation in this paper; measures task performance under randomized AI access rather than surveying adoption and perceived benefits.

[[index|Library home]]
