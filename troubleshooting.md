# Troubleshooting: Product Fetching Issues

If you are still seeing "Failed to fetch /products" errors in your console, your browser or development server is likely still running a cached version of the old code. Please follow these steps to force the new code to take effect.

## 1. Clear Browser Cache (Chrome/Edge/Brave)
- Open your website in the browser.
- Press `F12` to open **Developer Tools**.
- Go to the **Network** tab.
- Check the box that says **"Disable cache"**.
- While keeping the Developer Tools open, **Right-click the Refresh button** next to the URL bar and select **"Hard Reload"** or **"Empty Cache and Hard Reload"**.

## 2. Restart the Development Server
Since you are using Vite, sometimes a full restart is necessary to clear the module cache:
1. Go to your terminal where the `npm run dev` command is running.
2. Press `Ctrl + C` to stop the server.
3. Run `npm run dev` again.

## 3. Verify the Endpoint in Console
- Once the page reloads, look at the **Network** tab in Developer Tools.
- Filter by `Fetch/XHR`.
- You should see a request to: 
  `https://blog.bioryth.com/wp-json/wp/v2/posts?_embed&per_page=100&categories_exclude=1,3`
- If you still see a request to `/products`, then the code change has NOT yet been picked up by your build system.

## 4. Check Category Filtering
- In the **Products** page, click on **"HEALTHY AGING + LONGEVITY"**.
- This will now filter for category ID **6**, which I've confirmed exists on your site and contains the "Uthever® NMN" product.
