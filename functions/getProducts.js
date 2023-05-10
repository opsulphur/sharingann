const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

exports.handler = async (event, context) => {
  const uri = 'mongodb+srv://xsanchitguptaa:NEsEpTq6d5XxCb1C@OsmatiX.mongodb.net/osmatixop?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const collection = client.db('osmatixop').collection('movies');

    const products = await collection.find().toArray();

    let html = '';

    // Generate HTML content for each product card
    products.forEach(product => {
      html += `
        <div class="product-card">
          <a href="${product.url}">
            <img src="${product.image}" alt="${product.title}">
            <h2 class="visually-hidden">${product.title}</h2>
          </a>
        </div>
      `;
    });

    // Read the movies.html file
    const moviesHtmlPath = `${process.env.LAMBDA_TASK_ROOT}/movies.html`; // Assuming movies.html is in the root directory of your Netlify function
    const moviesHtml = fs.readFileSync(moviesHtmlPath, 'utf8');

    // Replace the placeholder <!--PRODUCT_CARDS--> in the movies.html file with the generated product cards HTML
    const finalHtml = moviesHtml.replace('<!--PRODUCT_CARDS-->', html);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: finalHtml,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  } finally {
    await client.close();
  }
};
