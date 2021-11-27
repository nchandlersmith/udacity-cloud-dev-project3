interface TestConfig {
  host: string;
  port: string;
}

export const testConfig: TestConfig = {
  host: process.env.UDAGRAM_HOST,
  port: process.env.PORT
}
