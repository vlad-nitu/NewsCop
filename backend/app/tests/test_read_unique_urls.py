import unittest
import os


from app.persist_docs.read_unique_urls import read_urls_from_file, write_urls_to_file


class TestReadUniqueUrls(unittest.TestCase):
    def test_read_urls_from_file(self):
        test_file = 'test_file.txt'
        with open(test_file, 'w') as f:  # write \n so that we simulate the behavior of `unique_urls.txt` file
            f.write('  https://www.test1.com   \n')  # stripping
            f.write('""https://www.test2.com   \n')  # "" start
            f.write('https://www.test3.com""\n')  # "" end
            f.write(' ""https://www.test4.com"" \n')  # test1, 2 and 3 combined
            f.write('https://www.test5.com\n\n')  # \n end

        expected_output = ['https://www.test1.com',
                           'https://www.test2.com',
                           'https://www.test3.com',
                           'https://www.test4.com',
                           'https://www.test5.com'
                           ]

        self.assertEquals(read_urls_from_file(test_file), expected_output)

        # Clean up
        os.remove(test_file)

    def test_write_urls_to_file(self):

        test_file_path = 'test_file.txt'  # initially empty file
        test_urls = ['https://www.test1.com',
                     'https://www.test2.com',
                     'https://www.test3.com',
                     'https://www.test4.com',
                     'https://www.test5.com'
                     ] 

        write_urls_to_file(test_urls, test_file_path)

        # Do not add '\n' after last URL
        expected_urls = [url + '\n' if url_id != len(test_urls) - 1 else url for (url_id, url) in enumerate(test_urls)]

        with open(test_file_path) as f:
            obtained_urls = f.readlines()

        self.assertEquals(expected_urls, obtained_urls)

        # Clean-up
        os.remove(test_file_path)
