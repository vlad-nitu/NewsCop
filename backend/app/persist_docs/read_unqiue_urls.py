def read_urls_from_file(file_path):
    with open(file_path) as f:
        urls = f.readlines()
    urls = [url.strip() for url in urls]  # Remove leading and trailing spaces
    urls = [url[2:] if url.startswith('""') else url for url in urls]
    urls = [url[:-2] if url.endswith('""') else url for url in urls]
    urls = [url for url in urls if url.startswith("https://")]
    return urls

def write_urls_to_file(urls, file_path):
    with open(file_path, "w") as out:
        out.write('\n'.join(urls))

def main():
    input_file = 'unique_urls.txt'
    output_file = 'preprocessed_unique_urls.txt'

    urls = read_urls_from_file(input_file)
    write_urls_to_file(urls, output_file)


if __name__ == '__main__':
    main()
