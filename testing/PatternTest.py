# brad

# create track, create 2 patterns, delete both

from selenium import webdriver


def get_pattern(drvr):
    return drvr.find_element_by_id("patternDisplay").get_attribute('value')


with webdriver.Chrome() as driver:
    driver.get("http://localhost:8080")
    driver.find_element_by_id("createtrack").click()
    driver.find_element_by_id("createpattern").click()
    assert get_pattern(driver) == '0'
    driver.find_element_by_id("createpattern").click()
    assert get_pattern(driver) == '1'
    driver.find_element_by_id("delpattern").click()
    driver.find_element_by_id("delpattern").click()
    assert len(driver.find_elements_by_id("patternDisplay")) < 1
