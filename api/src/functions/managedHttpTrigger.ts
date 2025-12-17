import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function managedHttpTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'from the API';

    return { body: `Hello, ${name}!` };
};

app.http('managedHttpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: managedHttpTrigger
});
