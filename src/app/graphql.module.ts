import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment.prod';

// Production
// const uri = 'https://plus.beyond-solution.com/graphql';

// Local Machine
const uri = 'http://localhost:8000/graphql';

export function createApollo(httpLink: HttpLink) {
  const apiKey = setContext((operation, context) => ({
    headers: {
      'api-key': environment.API_KEY,
    },
  }));

  const link = ApolloLink.from([apiKey, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
