with open('unique_urls.txt') as f:
    urls = f.readlines()

urls = [url.strip() for url in urls] # Remove leading and trailing spaces 
urls = [url[2:] if url.startswith('""') else url for url in urls]
urls = [url[:-2] if url.endswith('""') else url for url in urls]
urls = [url for url in urls if url.startswith("https://")]
# print('\n'.join(urls)) # prints to stdou

with open("preprocessed_unique_urls.txt", "w") as out: # write to file
    out.write('\n'.join(urls))
