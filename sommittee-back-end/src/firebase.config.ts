import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = {
  projectId: 'social-sommittee',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrydGx7Ou59qeg\nuRItULsfiEUsmfQDTCTRlJSaQhKc6w87arBukUJjTyF2vnBLeqhikhBZ1w0y1g6a\nFguTPZCQfMgXw1wxrK+NX9788HIp29jyEmBJA1zCUcJe/g1n/1zj6yd/++sY51b/\nAEm82iJx3zQ8Pf1D2/IC/B93162QNuAclUR4U5o2A5F+s8PBGJB1ZTukeCqgDdQD\npOIFGpd1LTLKIp5/wUzFBeE80kncmdCJQ6Xb3q9cCYDkMFrRq5ROlbEfixHOq6r9\nfaRz3VFObldWGmgT357jkpsM3j3a7I/yojyUMy777loMidUMgikS/nNj8K0GdDfo\nlyT5Z8hvAgMBAAECggEAHlz4DtI44fAaNbqwX0kPIeYkj9sQOYr6UP7JezBleM3F\nLfPQBmLvUH06hXHoiDbAT1fQwwhTIWKbRxnRZu9xP1CGz0hs4azLhJnm4F8hVouw\nnyynTxBkk0X/LGoL9Y85nGFCZIkixw6QnlavMc1+XBEe+uzb+GQGNQfaCgUZfM0j\nxhglP16bQPgsWOp5Rh89Xyiw/WXUvutqAzAU3vuva176fT9KrXtYC9rPVOyGR7tg\nZFZzg/kMv9ewAcwy9tY40sq9pyPotgz/F/+fPys0WlUXCF8MKIbiNeLEGQBmfX/v\nTZNTfPiAvafVi20+HTiEdvw1rhGFHtI5xiLNIVLV/QKBgQDlaKUX30SRpkOzg6U/\n0dpz6grTY/shKDVPgFtFtqn/+dv5ssShTvXghmhflJ7tUgLYQIpkVOfz4xIr5TX+\ncS2cGnaxuP6n6LA4sAskL9YrfE4JfmyY1kB6zWrydQ9088muhv8N+hZvpPVkjTds\nMngxFpHjTPo9hzKM0HwiIFuXowKBgQC/s2Bb/erJOyxAZE2CJG1Lxm/rLwtLSeU/\nu/CZk1j9mz5aNChi24I5xiCGSv7QMrniwOi7GmqOPEH6vQDzuDzTN+Bxlb4WbRD6\n6pC3yVxYJIG27kZbXd19863GdK3goT7R32KraE8qMRGTC5vhpz/SwgJEbxKQrzIY\ntEPpwAUIxQKBgDj8vcYoWEg2HStC0JIB91pEEVxhwciCzHtrT0EKF0DXOKXWmrHX\ng4y61sKnkLMzZDGEFtzFmrki9yigT8FdLA9TI5kSc3AShXQPhzT+DR3QSzJgjWmK\nD4px7Nc97REIXllUf5dhQKGLQMoxqkreXq0TBjqIrMEMDKqeP7fageYxAoGAeTrR\n1DsmkG2oVWxZC9VHfSUXv+43QTyRCpYq2KQzIeZcLyVO6P2SREEEbojczgNWRIzk\nYPaaripzO0LtaDN528U5Xftpg7sjgtp1/JQNnvwvP+U9fyhEGxPQMHG3SBgQpx6S\nwn0rmy3+xDQSN0jSdtEUJ/zqC6+PicnuLNOvG1UCgYEArVF86pH7p+7mPSs2zW7M\nlXdPZtRCpt6IgjMlx0mQQGSsHZ7aK2LBugRUBQXQMR5g7JpHqGrN5mJLfS1IF3fX\njdY+NzmYlCPonHBWjN1JNUAmGub6k2OHUAszD+FDso3QAXViBOxTkG4nDJcXjui6\nnPRarbBe+xPYc/V5NOtHjmc=\n-----END PRIVATE KEY-----\n',
  clientEmail:
    'firebase-adminsdk-mflae@social-sommittee.iam.gserviceaccount.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'social-sommittee.appspot.com',
});

export const bucket = admin.storage().bucket();
