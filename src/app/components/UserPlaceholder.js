import React from 'react'; import {
  Container, Grid, Placeholder,
} from 'semantic-ui-react';

const UserPlaceholder = () => (
  <Container>
    <Grid>
      <Grid.Column mobile="16" tablet="6" computer="6">
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      </Grid.Column>

      <Grid.Column mobile="16" tablet="10" computer="10">
        <Placeholder fluid>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Grid.Column>
    </Grid>
  </Container>
);

export default UserPlaceholder;
