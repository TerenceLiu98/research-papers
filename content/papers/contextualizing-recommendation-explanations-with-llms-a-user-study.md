---
title: "Contextualizing Recommendation Explanations with LLMs: A User Study"
type: paper
authors:
  - Yuanjun Feng
  - Stefan Feuerriegel
  - Yash Raj Shrestha
year: null
source_job_id: 982a91bc-f48f-4693-a3fb-7c25de07e725
tags:
  - recommender-systems
  - large-language-models
  - explainable-ai
  - personalization
  - user-studies
---

## TL;DR

In a preregistered U.S. movie-recommendation experiment with 759 participants, LLM explanations that explicitly connected recommendations to viewing history improved cognitive and affective evaluations and intention to watch relative to generic explanations or no explanation. Generic explanations provided no cognitive or affective advantage over no explanation and reduced watch intention. Contextualization had a smaller, less consistent utilitarian benefit, and interviews showed that preference mismatch, redundancy, and excessive detail can limit its value.

## Research Question

How do generic and [[concepts/contextualized-recommendation-explanations|Contextualized Recommendation Explanations]] address users' cognitive, affective, and utilitarian needs, and how do they affect intention to consume the recommended item?

## Motivation

Recommender systems often provide items without explaining why they fit a user. Natural-language generation makes explanations easy to produce, but fluent generic text may not improve understanding or decisions. The study therefore evaluates whether explanations grounded in a user's prior viewing history deliver measurable benefits, organizing explanation quality through the Uses and Gratifications framework rather than predictive accuracy alone.

## Contributions

- Compares no explanation, generic LLM explanation, and viewing-history-grounded LLM explanation in a preregistered between-subjects user study.
- Evaluates explanations across cognitive needs (scrutability, transparency, and trust), affective needs (persuasiveness and satisfaction), utilitarian needs (effectiveness, efficiency, and helpfulness), and watch intention.
- Combines pairwise tests, linear mixed-effects models, and 30 follow-up interviews to distinguish average effects from user interpretations.
- Replicates the experiment with Claude 3.5 Sonnet on an additional 140 U.S. participants and examines heterogeneity by movie genre.

## Method

The main study randomly assigned 759 U.S. participants to recommendations with no explanation (NE), GPT-4 Turbo-generated generic explanations (GE), or GPT-4 Turbo-generated contextualized explanations (CE). Participants selected previously watched movies, and a sequential cold-start procedure generated up to four recommendations before finding an unwatched title. CE explicitly related the recommended movie to viewing history; GE described only the recommended movie. Explanations were limited to 100 words and roughly three movie features. Movies were checked against IMDb, and two experts reviewed corpus consistency and quality.

Participants rated statements on seven-point scales. The study obtained 2,740 ratings: 918 in NE and 911 each in GE and CE. Cognitive, affective, and utilitarian composites average their constituent dimensions; UserIntent measures willingness to watch. Because outcomes were non-normal, pairwise comparisons used Mann-Whitney tests with Holm correction. Linear mixed-effects models included participant random intercepts and controls for demographics, movie consumption, recommender-system use and utility, viewing-history length, and display order. Thirty follow-up interviews supplied qualitative interpretation.

## Experiments

**Main comparison.** CE produced higher mean cognitive ratings (5.38) than NE (4.94) and GE (4.97), and higher affective ratings (5.19) than NE (5.05) and GE (4.99); both pairwise contrasts were significant after Holm correction. GE did not differ significantly from NE on either composite. For utilitarian needs, CE (5.44) significantly exceeded NE (5.32), but neither CE versus GE (5.34) nor GE versus NE was significant.

Watch intention differed across all three conditions: CE scored 4.85, NE 4.61, and GE 4.36, with each pairwise difference significant after correction. Thus generic explanatory text was not a neutral midpoint: it was associated with lower intention than providing no explanation.

**Mixed-effects results.** Relative to NE, CE had positive coefficients for cognitive ratings ($\beta=0.418$, $p<0.001$) and UserIntent ($\beta=0.277$, $p<0.05$); its affective and utilitarian coefficients were positive but not significant in the reported regression. Viewing-history length was positively associated with all four outcomes, although the coefficients were small. Perceived recommender utility and movie-consumption frequency were also positive predictors across outcomes. The negative interaction between history length and recommender utility for affective ratings, and between history length and movie consumption for utilitarian ratings, cautions against treating more context as uniformly beneficial.

**Interviews and heterogeneity.** Participants valued references to familiar movies when those references clarified similarity and supported control, including deciding that a recommendation was unsuitable. Preference and genre mismatch still dominated some watch decisions, while overly detailed explanations could feel redundant or reveal too much. A Claude 3.5 Sonnet replication with 140 participants broadly supported the contextualization result, though its smaller sample left some effects insignificant. In a genre analysis, comedy recommendations received lower affective, utilitarian, and intention ratings than adventure recommendations; explanation type did not significantly moderate those genre effects.

## Limitations

- The main sample was U.S.-based and primarily English-speaking, limiting cultural and linguistic generalization.
- Results depend on GPT-4 Turbo and, in the smaller replication, Claude 3.5 Sonnet; other models and future model behavior may differ.
- The cold-start design inferred preference from whether a movie had been watched, although viewing does not imply liking. Contextualized text can therefore confidently misrepresent weak behavioral signals.
- Participants could not state niche or explicit preferences, and recommendation quality was difficult to separate from explanation quality in their judgments.
- The experiment measured immediate perceptions and stated watch intention rather than longitudinal use or observed consumption.
- Context was capped at four prior movies, and only selected explanation strategies and movie genres were studied. More context produced small average gains but sometimes caused redundancy or cognitive overload.

## Related Concepts

- [[concepts/contextualized-recommendation-explanations|Contextualized Recommendation Explanations]] ground a recommendation rationale in user-specific history or preferences.

## Related Papers

- Balog and Radlinski (2020), "Measuring Recommendation Explanation Quality: The Conflicting Goals of Explanations": supplies the explanation-quality dimensions used in the study.
- Kunkel et al. (2019), "Let Me Explain: Impact of Personal and Impersonal Explanations on Trust in Recommender Systems": a cited user study comparing personalized and impersonal explanations.
- Silva et al. (2024), "Leveraging ChatGPT for Automated Human-Centered Explanations in Recommender Systems": a cited comparison of generic and personalized movie explanations.
- Lubos et al. (2024), "LLM-Generated Explanations for Recommender Systems": a cited evaluation of LLM explanations against template-based explanations.

Code: https://github.com/diana3135/Contextualizing-Recommendation-With-LLMs

[[index|Library home]]
