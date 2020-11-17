from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support.ui import Select
import random

with webdriver.Chrome() as driver:
    driver.get("http://localhost:8080")
    driver.find_element_by_id("InstRoute").click()
    driver.find_element_by_id("createtrack").click()
    s1 = Select(driver.find_element_by_id("source1"))
    s1.select_by_visible_text("ELPHNT")
    s2 = Select(driver.find_element_by_id("source2"))
    s2.select_by_index(random.randint(0,len(s2.options)-1))
    s3 = Select(driver.find_element_by_id("source3"))
    s3.select_by_index(random.randint(0,len(s3.options)-1))
    driver.find_element_by_id("assignButton").click()
    res = driver.find_element_by_id("instPanel").text
    assert len(res) > 0
