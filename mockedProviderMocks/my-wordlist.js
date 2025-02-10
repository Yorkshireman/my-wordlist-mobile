import { MY_WORDLIST } from '../src/graphql-queries';
/* eslint-disable sort-keys */
export const myWordlistQueryMock = {
  request: {
    query: MY_WORDLIST
  },
  result: {
    data: {
      authToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzEyNjgzODgsInVzZXJfaWQiOiI2YjhmM2E0ZS03YWMzLTQ5YTAtODVhZS1mYWUxNzhiODYwNzkifQ.BP3srNQ_tgFe_65KoFapvCzpouccKv8cp837xHUEZAY',
      myWordlist: {
        __typename: 'MyWordlist',
        id: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
        entries: [
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-06-09T14:46:00Z',
            updatedAt: '2024-06-09T14:46:00Z',
            id: '74d51f2b-ba29-437c-9feb-0711dbe4c206',
            wordId: '5ff38d8b-d8b2-4629-b431-4adcf9c54cef',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-06-09T14:46:00Z',
              id: '5ff38d8b-d8b2-4629-b431-4adcf9c54cef',
              text: 'constructive'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-08T14:46:00Z',
                id: '5d0c09ad-0f79-47b7-b2f3-6567ef5e6ad8',
                name: 'food'
              }
            ],
            createdAt: '2024-05-11T17:32:24Z',
            id: 'ccb6aba4-78ad-4e26-968c-77078eb860d3',
            updatedAt: '2024-05-11T17:32:24Z',
            wordId: '40884822-c41c-4028-bdec-fa3d79a629fe',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-11T17:32:24Z',
              id: '40884822-c41c-4028-bdec-fa3d79a629fe',
              text: 'pineapple'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-08T14:46:00Z',
                id: '5d0c09ad-0f79-47b7-b2f3-6567ef5e6ad8',
                name: 'food'
              }
            ],
            createdAt: '2024-05-11T17:30:45Z',
            id: 'cbf09172-cc16-4a11-90c3-0dce8036c205',
            updatedAt: '2024-05-11T17:30:45Z',
            wordId: 'adb0c552-2660-4ab9-9cdb-9907842f52b6',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-11T17:30:45Z',
              id: 'adb0c552-2660-4ab9-9cdb-9907842f52b6',
              text: 'apple'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-07T14:46:00Z',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              }
            ],
            createdAt: '2024-05-04T16:39:56Z',
            id: '45824606-8e65-4d94-93ab-851e751e10f1',
            updatedAt: '2024-05-04T16:39:56Z',
            wordId: 'ed396911-e7d2-4f54-a31a-8172364b6ba6',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-04T16:39:56Z',
              id: 'ed396911-e7d2-4f54-a31a-8172364b6ba6',
              text: 'pendulum'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-08T14:46:00Z',
                id: '5d0c09ad-0f79-47b7-b2f3-6567ef5e6ad8',
                name: 'food'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-06T14:46:00Z',
                id: '82d5375f-9a34-4c2d-b9c2-8b24b88b066e',
                name: 'adverb'
              }
            ],
            createdAt: '2024-05-03T17:45:14Z',
            id: 'd72c3e93-bca9-4cfc-b250-6e9200fd418f',
            updatedAt: '2024-05-03T17:45:14Z',
            wordId: '2eb1938a-8e37-4f29-8e1a-b3f43086f2d6',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:47:14Z',
              id: '2eb1938a-8e37-4f29-8e1a-b3f43086f2d6',
              text: 'deliciously'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-08T14:46:00Z',
                id: '5d0c09ad-0f79-47b7-b2f3-6567ef5e6ad8',
                name: 'food'
              }
            ],
            createdAt: '2024-05-03T17:44:40Z',
            id: '2aa1e68c-0596-4fd1-aa88-987582497cbe',
            updatedAt: '2024-05-03T17:44:40Z',
            wordId: '124a5353-a21a-4e2d-a370-f9b8b4576e29',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:44:40Z',
              id: '124a5353-a21a-4e2d-a370-f9b8b4576e29',
              text: 'takeaway'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-05T14:46:00Z',
                id: '44458ace-7679-49e0-b99a-a8738b1c248d',
                name: 'transport'
              }
            ],
            createdAt: '2024-05-03T17:44:07Z',
            id: 'c6a4c91f-ca61-4ea9-ad09-4f508d8bafc3',
            updatedAt: '2024-05-03T17:44:07Z',
            wordId: '985bf115-b08b-4c31-8172-2c50b3cd142c',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:44:07Z',
              id: '985bf115-b08b-4c31-8172-2c50b3cd142c',
              text: 'train'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-05T14:46:00Z',
                id: '44458ace-7679-49e0-b99a-a8738b1c248d',
                name: 'transport'
              }
            ],
            createdAt: '2024-05-03T17:43:46Z',
            id: '3bac9caa-77b7-4b3f-b1b4-9fcb5d6f2ff6',
            updatedAt: '2024-05-03T17:43:46Z',
            wordId: '04ccddda-252c-4996-9e8a-4e26a61a488b',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:43:46Z',
              id: '04ccddda-252c-4996-9e8a-4e26a61a488b',
              text: 'motorway'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-04T14:46:00Z',
                id: 'f6c0fc6f-3b01-4059-9588-ccb2bda39d23',
                name: 'household'
              }
            ],
            createdAt: '2024-05-03T17:43:26Z',
            id: '9e4ded46-2eb4-4ca3-94c2-7e78fb4a5ce2',
            updatedAt: '2024-05-03T17:43:26Z',
            wordId: 'ee300ef3-25db-4197-9c29-c39d2a9b9e34',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:43:26Z',
              id: 'ee300ef3-25db-4197-9c29-c39d2a9b9e34',
              text: 'carpet'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-06T14:46:00Z',
                id: '82d5375f-9a34-4c2d-b9c2-8b24b88b066e',
                name: 'adverb'
              }
            ],
            createdAt: '2024-05-03T17:43:04Z',
            id: 'a0049345-e75b-4142-9417-410d674d5561',
            updatedAt: '2024-05-03T17:43:04Z',
            wordId: 'da40fa00-cb7d-4119-9f38-bfe10b1ea50e',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:43:04Z',
              id: 'da40fa00-cb7d-4119-9f38-bfe10b1ea50e',
              text: 'funnily'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-03T14:46:00Z',
                id: 'b368ab77-04cf-438b-b6b2-add9afbf2d3d',
                name: 'anatomy'
              }
            ],
            createdAt: '2024-05-03T17:42:51Z',
            id: 'd150b531-ad0c-4b5f-a431-df4948450f8b',
            updatedAt: '2024-05-03T17:42:51Z',
            wordId: 'd0b669fc-71ba-4c81-87f2-90aa53c4d71b',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:42:51Z',
              id: 'd0b669fc-71ba-4c81-87f2-90aa53c4d71b',
              text: 'arterial'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [],
            createdAt: '2024-05-03T17:42:09Z',
            id: '9c00fea7-dc33-4b3c-8084-62c2902c5e0d',
            updatedAt: '2024-05-03T17:42:09Z',
            wordId: 'ccf33166-0a6e-4ff3-991b-cb60865df757',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:42:09Z',
              id: 'ccf33166-0a6e-4ff3-991b-cb60865df757',
              text: 'mathematics'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-02T14:46:00Z',
                id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
                name: 'verb'
              }
            ],
            createdAt: '2024-05-03T17:41:53Z',
            id: 'cac42246-8efa-4f60-9079-2cfaef20f818',
            updatedAt: '2024-05-03T17:41:53Z',
            wordId: 'd1ad415b-7e3a-4903-b163-008c1f3f9ba5',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:41:53Z',
              id: 'd1ad415b-7e3a-4903-b163-008c1f3f9ba5',
              text: 'confuse'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-02T14:46:00Z',
                id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
                name: 'verb'
              }
            ],
            createdAt: '2024-05-03T17:41:39Z',
            id: '3391cf76-4dfc-41f4-ba0e-729b53e69299',
            updatedAt: '2024-05-03T17:41:39Z',
            wordId: 'bab0397b-05f4-4b60-bf49-fd72bf8e1b1b',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:41:39Z',
              id: 'bab0397b-05f4-4b60-bf49-fd72bf8e1b1b',
              text: 'postulate'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-05-03T17:30:34Z',
            id: '418dbddc-39ec-4d71-aec2-f2aa5646a2b2',
            updatedAt: '2024-05-03T17:30:34Z',
            wordId: 'b358c6dd-8b11-41db-bc96-ca6a2bd7488c',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:30:34Z',
              id: 'b358c6dd-8b11-41db-bc96-ca6a2bd7488c',
              text: 'honourable'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-05-03T17:30:29Z',
            id: '7044fa41-4d62-4b8a-af2e-94627ac13690',
            updatedAt: '2024-05-03T17:30:29Z',
            wordId: '85fd327a-8f63-4c7e-aefd-db4290be9a1d',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:30:29Z',
              id: '85fd327a-8f63-4c7e-aefd-db4290be9a1d',
              text: 'admirable'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-05-03T17:30:04Z',
            id: 'ddbe5f6e-61fe-4962-866d-6a72185cff94',
            updatedAt: '2024-05-03T17:30:04Z',
            wordId: 'b01faf5b-7389-46eb-9914-2c100b521267',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-05-03T17:30:04Z',
              id: 'b01faf5b-7389-46eb-9914-2c100b521267',
              text: 'disorderly'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-07T14:46:00Z',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              }
            ],
            createdAt: '2024-05-03T17:14:58Z',
            id: '6149e068-4faf-483b-bd1c-ad0e2771b816',
            updatedAt: '2024-05-03T17:14:58Z',
            wordId: 'ee9edc1b-aea7-41dc-84ca-437856d70292',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2023-11-12T16:58:18Z',
              id: 'ee9edc1b-aea7-41dc-84ca-437856d70292',
              text: 'cup'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-05-03T17:14:44Z',
            id: '32aa72c5-5419-4be9-883d-34af3731d6f7',
            updatedAt: '2024-05-03T17:14:44Z',
            wordId: 'da9fe990-3d72-423e-aaa5-136cda161592',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2023-11-19T21:41:18Z',
              id: 'da9fe990-3d72-423e-aaa5-136cda161592',
              text: 'foolish'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-01T14:46:00Z',
                id: 'b67f419c-2556-450c-9a24-752ec32cf9c3',
                name: 'home'
              }
            ],
            createdAt: '2024-03-16T16:00:15Z',
            id: 'af226552-e7a7-464e-8e19-a01fb545cb48',
            updatedAt: '2024-03-16T16:00:15Z',
            wordId: '6ab2b868-1aa0-4d2e-9ae0-fe3ae95f9559',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-04-28T11:48:33Z',
              id: '6ab2b868-1aa0-4d2e-9ae0-fe3ae95f9559',
              text: 'garden'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-03-15T14:46:00Z',
                id: '3e3185f6-ba17-4dbe-a678-ffea6799a276',
                name: 'industry'
              }
            ],
            createdAt: '2024-03-16T15:55:38Z',
            id: '0aa9569b-7749-4696-840f-34fe7473808f',
            updatedAt: '2024-03-16T15:55:38Z',
            wordId: '7d7c7b33-05ae-4c87-be05-de9a9efe47b9',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-16T15:55:38Z',
              id: '7d7c7b33-05ae-4c87-be05-de9a9efe47b9',
              text: 'construction'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-07T14:46:00Z',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-01T14:46:00Z',
                id: 'b67f419c-2556-450c-9a24-752ec32cf9c3',
                name: 'home'
              }
            ],
            createdAt: '2024-03-16T15:55:20Z',
            id: 'b42f97c7-079a-4dd2-8630-79e1d69416f7',
            updatedAt: '2024-03-16T15:55:20Z',
            wordId: 'be85bda3-184d-431b-910b-85ad78936312',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-16T15:55:20Z',
              id: 'be85bda3-184d-431b-910b-85ad78936312',
              text: 'shelf'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-09T14:46:00Z',
                id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
                name: 'adjective'
              }
            ],
            createdAt: '2024-03-14T18:52:32Z',
            id: '6a50d324-a9e1-4104-8efd-3d51f5338151',
            updatedAt: '2024-03-14T18:52:32Z',
            wordId: '037c35ef-ef8c-49ed-99ab-9812337310ef',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:52:32Z',
              id: '037c35ef-ef8c-49ed-99ab-9812337310ef',
              text: 'understated'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-07T14:46:00Z',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              }
            ],
            createdAt: '2024-03-14T18:52:16Z',
            id: 'c7236384-7437-40cf-98ba-0edb761f605e',
            updatedAt: '2024-03-14T18:52:16Z',
            wordId: '1c684fcd-ddf9-4079-9183-07cb28fcf479',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2023-12-23T16:40:10Z',
              id: '1c684fcd-ddf9-4079-9183-07cb28fcf479',
              text: 'plumes'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-03-14T14:46:00Z',
                id: '5097e71c-ba7f-4fcd-9122-91dadad10c88',
                name: 'weather'
              },
              {
                __typename: 'Category',
                createdAt: '2024-03-13T14:46:00Z',
                id: 'fdedf5fe-745c-4a9e-81d9-31d2817276d4',
                name: 'nature'
              }
            ],
            createdAt: '2024-03-14T18:51:36Z',
            id: '9782d093-1438-41db-ac43-a23bad5b023b',
            updatedAt: '2024-03-14T18:51:36Z',
            wordId: '1d41edb2-e920-4363-baf3-d65a95d3f0b3',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2024-03-14T18:51:36Z',
              id: '1d41edb2-e920-4363-baf3-d65a95d3f0b3',
              text: 'raining'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-04T14:46:00Z',
                id: 'f6c0fc6f-3b01-4059-9588-ccb2bda39d23',
                name: 'household'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-01T14:46:00Z',
                id: 'b67f419c-2556-450c-9a24-752ec32cf9c3',
                name: 'home'
              }
            ],
            createdAt: '2024-03-14T18:50:04Z',
            id: 'c9e90b47-0460-4278-9da8-3e1f5a576c8a',
            updatedAt: '2024-03-14T18:50:04Z',
            wordId: 'd056b7b1-0d26-4313-bbdb-d91656856b3c',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2023-06-25T16:44:28Z',
              id: 'd056b7b1-0d26-4313-bbdb-d91656856b3c',
              text: 'table'
            }
          },
          {
            __typename: 'WordlistEntry',
            categories: [
              {
                __typename: 'Category',
                createdAt: '2024-04-04T14:46:00Z',
                id: 'f6c0fc6f-3b01-4059-9588-ccb2bda39d23',
                name: 'household'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-02T14:46:00Z',
                id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
                name: 'verb'
              },
              {
                __typename: 'Category',
                createdAt: '2024-04-07T14:46:00Z',
                id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                name: 'noun'
              }
            ],
            createdAt: '2023-12-02T17:49:52Z',
            id: '0a23cd3b-2f6f-451a-9e82-82ef2a2b08b0',
            updatedAt: '2023-12-02T17:49:52Z',
            wordId: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf',
            word: {
              __typename: 'Word',
              createdAt: '2023-10-29T19:11:14Z',
              id: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
              text: 'phone'
            }
          }
        ]
      }
    }
  }
};

export const myWordlistQueryMockWithOneEntry = {
  ...myWordlistQueryMock,
  result: {
    data: {
      ...myWordlistQueryMock.result.data,
      myWordlist: {
        ...myWordlistQueryMock.result.data.myWordlist,
        entries: [myWordlistQueryMock.result.data.myWordlist.entries[0]]
      }
    }
  }
};
/* eslint-enable sort-keys */
