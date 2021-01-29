import { createTestContext } from './__helpers';

const ctx = createTestContext();

it('ensures that a draft can be created and published', async () => {
  const draftResult = await ctx.client.request(`
    mutation {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `);

  // Snapshot that draft and expect `published` to be false
  expect(draftResult).toMatchInlineSnapshot();

  const publishResult = await ctx.client.request(
    `mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id },
  );

  // Snapshot the published draft and expect `published` to be true
  expect(publishResult).toMatchInlineSnapshot();
});
