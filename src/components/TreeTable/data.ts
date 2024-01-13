export interface DataItem {
  key: string
  children?: DataItem[]
}

export default <DataItem[]>[
  {
    key: '1',
    children: [
      {
        key: '1-1',
        children: [
          {
            key: '1-1-1',
            children: [
              {
                key: '1-1-1-1'
              },
              {
                key: '1-1-1-2',
                children: [
                  {
                    key: '1-1-1-2-1'
                  },
                  {
                    key: '1-1-1-2-2'
                  },
                  {
                    key: '1-1-1-2-3'
                  }
                ]
              }
            ]
          },
          {
            key: '1-1-2'
          },
          {
            key: '1-1-3',
            children: [
              {
                key: '1-1-3-1'
              },
              {
                key: '1-1-3-2'
              }
            ]
          }
        ]
      },
      {
        key: '1-2',
        children: [
          {
            key: '1-2-1'
          },
          {
            key: '1-2-2'
          },
          {
            key: '1-2-3'
          }
        ]
      },
      {
        key: '1-3'
      },
      {
        key: '1-4'
      }
    ]
  },
  {
    key: '2',
    children: [
      {
        key: '2-1'
      },
      {
        key: '2-2',
        children: [
          {
            key: '2-2-1'
          },
          {
            key: '2-2-2',
            children: [
              {
                key: '2-2-2-1'
              },
              {
                key: '2-2-2-2'
              }
            ]
          },
          {
            key: '2-2-3'
          }
        ]
      }
    ]
  },
  {
    key: '3',
    children: [
      {
        key: '3-1',
        children: [
          {
            key: '3-1-1'
          },
          {
            key: '3-1-2'
          },
          {
            key: '3-1-3'
          }
        ]
      },
      {
        key: '3-2'
      }
    ]
  },
  {
    key: '4'
  },
  {
    key: '5'
  },
  {
    key: '6',
    children: [
      {
        key: '6-1',
        children: [
          {
            key: '6-1-1'
          },
          {
            key: '6-1-2'
          },
          {
            key: '6-1-3'
          }
        ]
      },
      {
        key: '6-2'
      }
    ]
  },
  {
    key: '7'
  },
  {
    key: '8'
  }
]
