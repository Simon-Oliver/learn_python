import scrapy

class PostsSpider(scrapy.Spider):
    name = "posts"
    start_urls = [
        "http://books.toscrape.com/catalogue/page-2.html"
        "http://books.toscrape.com/catalogue/page-3.html"
    ]

    def parse(self, response):
        page = response.url.split("/")[-1]
        filename = 'posts-{0}.html'.format(page)
        print("-------------------->",page,"-------------")
        with open(filename, "wb") as f:
            f.write(response.body)