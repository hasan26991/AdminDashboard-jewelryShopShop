import { Amplify } from "aws-amplify";

// "test", "Test!2345678"

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "eu-west-1:01ae1d18-6ea1-4183-8876-d7a1203f2e99",

    // REQUIRED - Amazon Cognito Region
    region: "eu-west-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "eu-west-1_gqvC9zuwq",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "f7b7901sek1k9fo7qa2ulf6rg",
  },
});
