import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={[
        '지난주',
        '이번주'
      ]}
      indexBy="day"
      margin={{ top: 12, right: 84, bottom: 24, left: 24 }}
      padding={0.2}
      // width={320}
      height={200}
      minValue={0}
      
      groupMode="grouped"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'paired' }}
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
            id: '지난주'
          },
          id: 'lines'
        },
        {
          match: {
            id: '이번주'
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
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: '요일',
      //   legendPosition: 'middle',
      //   legendOffset: 32
      // }}
      axisLeft={null}
      // axisBottom={null}
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
          anchor: 'right',
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
                itemOpacity: 1,
              }
            }
          ]
        }
      ]}
      // motionConfig="gentle"
      animate={false}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e => e.id + ": " + e.formattedValue + " in days: " + e.indexValue}
    />
    )


export default MyResponsiveBar;
