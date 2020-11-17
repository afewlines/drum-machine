from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located

with webdriver.Chrome() as driver:
    driver.get("http://localhost:8080")
    input = driver.find_element_by_id("strack")
    before = input.get_attribute('value')
    test = driver.find_element_by_id("createtrack")
    test = test.click()
    after = driver.find_element_by_id("strack")
    after = after.get_attribute('value')
    if (before == '0' and after == '1'):
        print("Success! Before track was clicked, track was", before,", after track was clicked, track is", after)
    else:
        print("failure")
