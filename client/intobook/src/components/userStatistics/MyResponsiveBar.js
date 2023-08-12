import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

const MyResponsiveBar = ({ data }) => (

  <ResponsiveBar
    data={data}
    keys={[
      'lastweek',
      'thisweek'
    ]}
    indexBy="day"
    margin={{ top: 24, right: 0, bottom: 72, left: 60 }}
    padding={0.2}
    // width={320}
    height={300}
    minValue={0}
    // maxValue={0}
    groupMode="grouped"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'pastel1' }}
    defs={[
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -0,
        lineWidth: 0,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: 'lastweek'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'thisweek'
        },
        id: 'lines'
      }
    ]}
    borderRadius={5}
    borderColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          1.6
        ]
      ]
    }}
    // axisBottom={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: 'country',
    //     legendPosition: 'middle',
    //     legendOffset: 32
    // }}
    axisLeft={null}
    axisBottom={null}
    // axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: '읽은 시간',
    //     legendPosition: 'middle',
    //     legendOffset: 0
    // }}
    enableLabel={false}
    enableGridY={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          1.6
        ]
      ]
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
  />
)

export default MyResponsiveBar;
