---
title: "How Police Behavior Shapes Perceptions of Protests: Evidence from Black Lives Matter"
type: paper
authors:
  - Jasmine English
  - Ariel White
  - Laurel Eckhouse
year: 2024
doi: 10.1017/S1537592724002731
tags:
  - protest-policing
  - black-lives-matter
  - public-opinion
  - survey-experiments
  - social-movements
---

## TL;DR

Police responses varied substantially across more than 1,000 Black Lives Matter protests held from July 2014 through March 2017, including among events with similar messages and tactics. In a preregistered survey experiment with 2,710 US respondents, adding a sentence and photograph showing armed police behind barricades caused readers to perceive the depicted protest and its participants as more violent and troublesome. The treatment did not significantly change support for the protesters or willingness to participate. Exploratory subgroup results suggest stronger perception effects among white respondents and little response among Black respondents, but the study was not designed or powered for those comparisons.

## Research Question

Can variation in [[concepts/protest-policing|Protest Policing]] itself shape how observers judge a protest's violence and whether they support the movement, apart from the protesters' depicted behavior?

## Motivation

Research on protest outcomes often treats police response as a consequence of protest size, tactics, or participant composition. Yet visible police mobilization can also supply audiences with a cue about the event: a large armed deployment may imply that protesters pose a threat. This distinction matters because the political benefits associated with nonviolent resistance depend partly on how outside audiences perceive a movement, not only on which tactics participants actually use.

## Contributions

- Builds an original event-level dataset covering more than 1,000 BLM street protests between 2014 and 2017, joining protest characteristics to police presence, arrests, and crowd-control measures.
- Shows substantial observed variation in police response that measured protest characteristics explain only partly, directing attention to police discretion while not causally identifying why departments responded differently.
- Isolates the audience effect of a heavy police-presence cue in a randomized news-vignette experiment while holding the depicted protest constant.
- Separates perceptions of protest violence from support for the protesters: the former changed significantly, while the latter did not.
- Treats racial heterogeneity as exploratory and connects differences in response to police cues with unequal experiences and evaluations of policing.

## Method

### Protest event data

The authors begin with Alisa Robinson's crowdsourced BLM protest database, restrict it to public street protests, correct place and date records, separate multi-city entries, and manually code news and social-media sources. Variables include approximate crowd size, police presence, arrests, crowd-control tactics, time of day, highway blockage, other disruption, clergy organization, protest focus, and a coarse measure of protester racial composition. More than 90% of events could be coded for approximate size and police presence.

Linear models relate observed protest characteristics to three outcomes: any police presence, any arrests, and any crowd-control measures. These analyses are descriptive. They cannot resolve reciprocal within-event dynamics in which police and protesters react to one another, and the records measure events as represented in available coverage.

### Survey experiment

In April 2022, 2,710 US-based Prolific respondents were randomly assigned with equal probability to one of two realistic news stories about a BLM march. Both conditions showed the same image of nonviolent protesters. The treatment added a sentence and photograph of armed police standing behind barricades. The story did not explicitly label the protest peaceful and did not depict or describe protester violence.

Three five-point items measured whether the event was violent, whether protesters had violent intentions, and whether they were out to cause trouble. Four outcomes measured support, willingness to join a similar group, willingness to attend a similar protest, and willingness to post positively about it. The average-effect analysis followed a preregistered plan. Race-specific treatment-effect comparisons were not preregistered and are reported as exploratory.

## Experiments

### Variation in observed police responses

About two-thirds of coded protests had some police presence, 17% involved at least one arrest, and 14% involved crowd-control measures. Highway blockage, other disruption, evening timing, and large crowds predicted some dimensions of police response, but the reported models explained less than 30% of outcome variance. Specifications with state or county fixed effects still left more than half of the variation unexplained. The coarse majority-Black-participant measure did not predict more intense policing consistently.

### Effects on perceived violence

The heavy-police condition increased agreement that protesters had violent intentions by 0.21 points on a five-point scale. It increased judgments that the event was violent and that protesters were out to cause trouble by 0.15 points each. A combined perceived-violence index produced the same substantive conclusion.

### Effects on protest support

None of the four support outcomes changed significantly. Point estimates were small and in the hypothesized negative direction, but the authors interpret them as null results. The experiment therefore supports an immediate effect on event perception, not a demonstrated reduction in movement support.

### Exploratory racial heterogeneity

White respondents showed clear positive treatment effects on all three perceived-violence measures, whereas Black respondents showed essentially no treatment-control difference. Across measures, only the between-group difference for violent intentions reached conventional statistical significance. The study was not powered for subgroup interactions, and support outcomes showed no clear racial pattern.

The authors report similar perception results in a fall 2019 pilot and robustness checks using outcome indices. The main vignette used photographs and details from reporting on Baltimore protests after Freddie Gray's death.

## Limitations

- **Event-data identification:** The observational data establish variation and conditional associations, not whether police discretion caused a particular response. Police and protester behavior can develop jointly within an event.
- **Coverage and measurement:** News and social-media reports may omit events or portray them selectively. Protester racial composition is coarsely inferred from descriptions and photographs.
- **Treatment interpretation:** Because the control story does not explicitly say the protest was peaceful, respondents may reasonably use police deployment as information about unreported circumstances. The experiment identifies the effect of the complete cue, not whether its sentence, photograph, weapons, numbers, or barricades drove the response.
- **Outcome scope:** One exposure changed perceived violence but not support. The proposed pathway from repeated exposure to broader movement opposition was not tested.
- **External validity:** The sample came from Prolific and the vignette concerned one US movement and one news format. Similar effects for other movements, countries, media environments, or real-world repeated exposure remain to be established.
- **Subgroup evidence:** Racial heterogeneity was exploratory, not preregistered, and the study lacked power for these interactions. The authors did not directly measure trust in police, the proposed explanation for the pattern.
- **Source boundary:** The supplied text points to supplemental analyses and a preregistration, but those materials were not part of the supplied Markdown. This page therefore does not reconstruct details available only there.

## Related Concepts

- [[concepts/protest-policing|Protest Policing]]: police deployment and tactics can affect both events and the public signals surrounding them.
- [[concepts/protest-event-analysis|Protest Event Analysis]]: the paper constructs event-level records from multiple documentary sources and inherits their coverage and coding limitations.
- [[concepts/issue-framing-effects|Issue Framing Effects]]: a related audience-effects framework, though the police-presence treatment bundles visual and textual cues rather than manipulating only an issue emphasis.

## Related Papers

- Edwards and Arnon (2019), "Violence on Many Sides: Framing Effects on Protest and Support for Repression": cited evidence that portrayals of protest violence shape attitudes.
- Earl and Soule (2006), "Seeing Blue: A Police-Centered Explanation of Protest Policing": cited research on determinants of police response to protest.
- Chenoweth and Stephan (2011), *Why Civil Resistance Works*: cited account of why nonviolent resistance can attract participation and support.
- Wasow (2020), "Agenda Seeding: How 1960s Black Protests Moved Elites, Public Opinion, and Voting": a cited comparison emphasizing how protest tactics and state response affect political consequences.

[[index|Library home]]
