.read schema.sql
.separator ","
.import ./dataset/movies_metadata.csv movies_metadata
.import ./dataset/ratings.csv ratings
.import ./dataset/links.csv links
.import ./dataset/keywords.csv keywords
.import ./dataset/credits.csv credits
.save database.sqlite