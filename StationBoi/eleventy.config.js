
module.exports = function (eleventyConfig) {
  // Static assets
//  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("*.js");
  eleventyConfig.addPassthroughCopy("assets");

  // Dates
  eleventyConfig.addFilter("readableDate", (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  // Dynamic content collections
  const collections = {
    articles: "articles",
    scrapbookEntries: "scrapbook",
    fieldNotes: "field-notes",
    projects: "projects",
    homepageUpdates: "updates"
  };

  for (const [name, folder] of Object.entries(collections)) {
    eleventyConfig.addCollection(name, (api) =>
      api.getFilteredByGlob(`content/${folder}/*.md`)
        .sort((a, b) =>
          new Date(b.data.date || 0) -
          new Date(a.data.date || 0)
        )
    );
  }

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk"]
  };
};
