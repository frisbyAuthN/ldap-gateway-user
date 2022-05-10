# Overview

PingOne's [LDAP Gateways](https://docs.pingidentity.com/bundle/pingone/page/djk1630007404580.html) allow IAM admins to leverage on-premise directories to manage authentications with PingOne (P1). Just-in-time provisioning means that users who have never logged into P1 can be automatically provisioned when they log in for the first time.

To ensure my gateway was configured successfully before running users through the JIT provisioning process, I wrote a script to create users who could test the remote password check and password change functionality. The helper script programmatically creates a PingOne user linked to an on-premise LDAP directory. 

# Instructions

The script requires a configured [P1 Worker App](https://docs.pingidentity.com/bundle/pingone/page/tpm1625773613104.html) and an [LDAP Gateway](https://docs.pingidentity.com/bundle/pingone/page/jng1630009015698.html). In <code>import-LDAP-user.* </code>, update all the <code>*ID</code> fields and <code>accessToken</code> variable with the details relevant to your P1 environment.


The script was written in JavaScript and TypeScript using Node.js 16. PingDirectory was the on-premise directory used during testing.
## For JavaScript

To run the script:

<ol>
  <li><code>cd javascript</code></li>
  <li><code>npm install</code></li>
  <li><code>node import-LDAP-user.js</code></li>
</ol>

## For TypeScript

To run the script:

<ol>
  <li><code>cd typescript</code></li>
  <li><code>npm install</code></li>
  <li><code>tsc</code></li>
  <li><code>node tsc-js/import-LDAP-user.js</code></li>
</ol>

## Once you have a created a P1 user linked to an LDAP gateway
After running the script, you should have a new user in the specified P1 population. To test that the user can log in successfully:

<ol>
  <li>Create an authentication policy that uses the gateway. <a href="https://docs.pingidentity.com/bundle/pingone/page/udq1630009107452.html">Help doc</a></li>
  <li>Add the authentication policy to an application. <a href="https://docs.pingidentity.com/bundle/pingone/page/dnq1630009123789.html">Help doc</a></li>
  <li>Log in to the application with the user's on-premise directory credentials</li>
</ol>