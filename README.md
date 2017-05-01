### Summary
The visualization displays distributions of Major League Baseball player career home runs by how they hit. On average, based on statistical history, batters who bat left hit more home runs.  Hovering over the boxes will display the 25th quartile, the median, the 75th quartile, and the population; and hovering over the fences will display the maximum and minimum excluding outliers, which are colored salmon.  Truly exceptional players, outliers in this data set, are discoverable by hovering over the outliers to display the player's name and his career number of home runs. The visualization is [here](http://bl.ocks.org/ondramie/raw/2abd3b4739cc5ba2aeba/).

### Design
I chose a box-and-whisker plot because of its simplicity and the wealth of information that it depicts -- after performing exploratory data analysis on the data set.  I did not want to bog the viewer with unnecessary features and movement.  I wanted to depict something simple and straight-forward, yet explanatory.  The visual encodings were developed by the mathematician John Tukey.  I encoded the outliers a salmon-color to bring attention to them against the white space and distribution boxes below.  The layout was chosen to demonstrate the difference among how a player bats.  I chose soft colors to not saturate the viewer's retinas. 

The feedback that I received was mixed.  Initially, people unaccustomed to box-and-whisker plots were a little confounded. With a little coaching, interpretations were resolved, but the visualization left me wanting, so I added a mouse-over to explicitly state what each statistic was on the box.  I also incorporated changes recommended by the reviewers: title change, hover-over box with more data, color-changes, and text size increase.  Changes recommended by reviewers that I did not incorporate were an x-axis title and the time-scale of the data set.  An x-axis title to me seemed redundant, especially after correcting my title.  The time-scale of the data set was not sought since it seemed to me as project creep.

My project feedback centered on representing a clear finding.  In this vein, visual encoding made the data of the batters who hit left more pronounced, while the data of the other batters visually recessed.  The title was changed to corral the viewer to my author-driven narrative.     

### Feedback
#### Jessica Montoya, Software Product Manager, 03-16-16

*What do you notice in the visualization?*
I notice the red dots on top first. Then, I notice the difference of the height of each box that corresponds to each handedness label. 

*What questions do you have about the data?*
Over what period of time was this data collected? Does the data represent professional Baseball players records? Does each dot represent one batter?

*What relationships do you notice?*
There seem to be a wider range or left-handed homerun outcomes. Left handers score more home runs. Is that because there are more left-handers? 

*What do you think is the main takeaway from this visualization?*
Lefties are better batters.

*Is there something you don’t understand in the graphic?*
What does the height of the box represent? What does the height of the top bar represent? Do the red dots represent statistical outliers?

*How would you improve the visualization?*
It would be nice if when I hovered over the outliers there was more information about the Player: a photo, team, the years of their career. It would make the chart more rewarding to interact with, more fun.  

#### Martin-Martin, Udacity Student, 03-17-16

I'm missing an axis title for the x-axis. It explains through reading the title of your graph, but it took me a moment. So maybe it's better to have it right away clear.

I like that you put a hover event on the outliers, makes it a nice little feature to explore the names and numbers.

The hover-event for the boxplot basis boxes is however confusing. They turn red, but it seems for no particular reason. There is no additional information coming from this, and it made me expect it would be clickable or something (but it's not)
You could consider giving them color anyways - or maybe just remove this feature.

Also, this might be your design choice, that we only get to see information about the outliers - the players with especially high amount of homeruns.
This is maybe also okay, but it feels it should be justified somewhere in the text. You could add a little paragraph explaining what you were doing and why so.

#### Pablo Yanez, Principal Software Sales Engineer, 03-23-16

*What do you notice in the visualization?*
I see a bar and whiskers diagram with outliers for the performance of  baseball players, sliced by "hand"
Performance seems to be a bit better for left handed, although not too much. Switching doesn't seem to be a good strategy, although it may just be biased by a smaller sample size. Sample sizes are not in the diagram

*What questions do you have about the data?* 
Sample size for each slice should be present somewhere, not just aggregates
I'd wonder about correlations with other parameters to understand why left handeds have better perforamance

*What relationships do you notice?*
It seems that although left handed player have general better performance and the 75 quartile is higher, they have produced less "superstars", as there are less outliers. So, more right handed "ballers" may create the opposite media effect of what the graphics actually show. Again, sample sizes would be necessary to see if this is true

*What do you think is the main takeaway from this visualization?*
Hire a junior left handed guy if you dont have the money to hire a superstar.

*Is there something you don’t understand in the graphic?*
I dont think so. Although in general most people dont understand whiskers and bars diagrams and most dashboards for non-statisticians stay away from them

*How would you improve the visualization?*
the title is a bit misleading. You say player, but data seems to be for a number of players. You should specify something like "Home runs for NFL players, 1980 to 2015", or whatever that data is. I'd use :players" in plural, otherwise it can be taken as some kind of average for a single person.

#### Udacity Reviewer, 03-25-16
The visualization is really great and crafted with great attention to details. The chart is great and it is a nice starting point for explanatory visualization, however, in current form it lacks explanatory power a little bit. Looking at it I feel puzzled what exactly did you want to draw attention to and even README.md doesn't answer this question. It may be high result of left-handed players or similarity between switchers and right-handed or something else. I suggest you highlight your main message (for example, that left-handed players are really great). Check this post about the difference between explanatory graphic and exploratory one for ideas.
Also, it would be great if you add a little explanatory text somewhere nearby the graph. You may discuss you findings, background of the dataset and how to reader box and wisker plot for unexperienced viewers.

## Resources

Used for tool-tips, boxes, CSS:  

+ https://leanpub.com/D3-Tips-and-Tricks

Used for creating one svg:

+ http://bl.ocks.org/jensgrubert/7789216

Used `box.js` in order to create box and whisker plot:

+ https://bl.ocks.org/mbostock/4061502

Used to reconcile CSS and '.style' overwrite:

+ http://stackoverflow.com/questions/15709304/d3-color-change-on-mouseover-using-classedactive-true
