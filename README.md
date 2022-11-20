# Is it windy today?

Check it out for yourself! https://chitlangesahas.github.io/is-it-windy-today/

![Nov-19-2022 17-26-27](https://user-images.githubusercontent.com/18511823/202876936-902c75f0-769d-465b-9f76-83047af69cf6.gif)


A weather app to get a glance of the state of Wind and Temperature over 24 hours. (configured to Tyson's Corner, VA)

Some details of the project:

## Component Structure

This is the overall birds eye view of component structure of the App. The following considerations were made while thinking of  

<img width="1107" alt="Screenshot 2022-11-19 at 5 10 57 PM" src="https://user-images.githubusercontent.com/18511823/202876554-87f2bde2-3a20-43a4-be3a-be1c2228756a.png">

- When repeating patterns were spotted, e.g the `CompassDirection` was used in the main tile, as well as the in the Wind Trends (12/24h) row, I turned them into components.
- I tried my best to delegate specific tasks to each component, this makes them more modular and hence re-usable across the project. 
  - `CompassDirection` is only responsible for rendering the arrow in the correct direction based on `direction: string` prop.
  - `TemperatureTrendChart` is only responsible for rendering the chart based on provided data (as props)

## 3rd Party Library considerations
- Since `moment` is deprecated, I used `date-fns` as it does the formatting I need and reduces bundle size.
- Note that there is `@Material UI` and `Material/Joy` (based on Material UI), ideally we would only have one design system. I had to add Material UI for a couple icons (not the best choice, but acceptable for now)

## UI Design and UX considerations
- Added a `Reset` button so the user can quickly jump to the current hour's forecast without needing to press the back button multiple times.
- Used Icons to show wind direction instead of displaying `SW | N | NE` etc. Visuals > Text
- Used color and spacing as appropriate to point the user to the important information quickly.

## Performance Considerations
- I noticed that the `TemperatureTrendsChart` was re-rendering every time I pressed next, this is unnecessary because the trend data will remain the same for a considerable period of time (until forecasts change). I considered using `React.memo()` and `React.PureComponent` to memoize but it didn't work. I might be missing something. Going forward this would be the biggest thing I would address. 

## Possible improvements
- Performance as noted above.
- Take custom location input. (Currently it's hard coded to Tyson's Square, VA)
- Use more graphics/icons to show the `shortPrediction`, eg. Icons for "Sunny", Cloudy etc weather predictions.
