<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$repoOwner = 'anuragparida';
$repoName = 'NexusSlideshowJSON';
$endpoint = "https://api.github.com/repos/$repoOwner/$repoName/contents";

$casheDir = 'cache/';
$minRequestInterval = 600;
$lastRequestTimeFile = 'cache/last_request_time.txt';


setup();

$files = scandir($casheDir);
$combinedData = array();
$slideshowData = array();

foreach ($files as $file) {
    if ($file === '.' || $file === '..' || $file === 'sha.json' || $file === 'slideshow.json' || $file === 'combined_data.json' || $file === 'slideshow_data.json' || $file === 'last_request_time.txt') {
        continue;
    }

    $fileData = json_decode(file_get_contents($casheDir . $file), true);

    if ($file === 'slideshow.json') {
        $slideshowData = $fileData;
        $slideshowJson = json_encode($slideshowData, JSON_PRETTY_PRINT);
        $file = 'cache/slideshow_data.json';
        file_put_contents($file, $slideshowJson);
    } else {

        $combinedData = array_merge($combinedData, $fileData);
        addMissingType();
        $combinedJson = json_encode($combinedData, JSON_PRETTY_PRINT);
        $file = 'cache/combined_data.json';
        file_put_contents($file, $combinedJson);
        replaceUUID();
    }
}
function canMakeRequest()
{
    global $lastRequestTimeFile, $minRequestInterval;

    if (!file_exists($lastRequestTimeFile)) {
        return true; // First request can be made
    }

    $lastRequestTime = intval(file_get_contents($lastRequestTimeFile));
    $currentTime = time();

    return ($currentTime - $lastRequestTime) >= $minRequestInterval;
}

function updateLastRequestTime()
{
    global $lastRequestTimeFile;

    file_put_contents($lastRequestTimeFile, time());
}


function setup()
{
    global $casheDir;

    if (!file_exists($casheDir)) {
        mkdir($casheDir, 0777, true);
    }
    $files = glob($casheDir . '*');

    if (count($files) === 0) {

        downloadAllFromGithub();
        setup();
    }
    checkSHAFromGithub();
}

function fetchSHAFromGitHub()
{
    global $endpoint, $casheDir;

    if (!canMakeRequest()) {

        return;
    }

    updateLastRequestTime();

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: Your-App-Name',
    ));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {

        curl_close($ch);
        exit;
    }

    $data = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {

        exit;
    }

    $combinedData = array();
    $shaData = array();

    foreach ($data as $item) {

        $shaData[$item['name']] = $item['sha'];
        $fileContent = curl_exec($ch);
        curl_close($ch);
        $fileData = json_decode($fileContent, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            if ($item['name'] === 'slideshow.json') {
                $slideshowData = $fileData;
            } else {
                $combinedData = array_merge($combinedData, $fileData);
            }
        }
        $cacheFilePath = $casheDir . 'sha.json';
        file_put_contents($cacheFilePath, json_encode($shaData));
    }
}

function checkSHAFromGithub()
{

    // check if sha.json exists
    global $endpoint;
    if (file_exists('cache/sha.json')) {
        $shaData = json_decode(file_get_contents('cache/sha.json'), true);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'User-Agent: Your-App-Name',

        ));

        $response = curl_exec($ch);

        if (curl_errno($ch)) {

            curl_close($ch);
            exit;
        }

        $data = json_decode($response, true);

        if (json_last_error() !== JSON_ERROR_NONE) {

            exit;
        }

        $newShaData = array();
        foreach ($data as $item) {
            $newShaData[$item['name']] = $item['sha'];
        }

        if ($shaData === $newShaData) {

            return;
        } else {

            foreach ($newShaData as $key => $value) {
                if ($shaData[$key] !== $value) {
                    $changedFiles[] = $key;

                    downloadFromGithub($key);
                    $shaData[$key] = $value;
                    file_put_contents('cache/sha.json', json_encode($shaData));
                }
            }
        }
    } else {
        fetchSHAFromGitHub();
    }
}

function downloadFromGithub($key)
{

    global $endpoint, $casheDir;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: Your-App-Name',

    ));

    $response = curl_exec($ch);

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {

        exit;
    }

    $fileData = null;

    foreach ($data as $item) {
        if ($item['name'] === $key) {
            $fileCh = curl_init();
            curl_setopt($fileCh, CURLOPT_URL, $item['download_url']);
            curl_setopt($fileCh, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($fileCh, CURLOPT_HTTPHEADER, array(
                'User-Agent: Your-App-Name',

            ));

            $fileContent = curl_exec($fileCh);

            if (curl_errno($fileCh)) {

                curl_close($fileCh);
                continue;
            }

            curl_close($fileCh);

            $fileData = json_decode($fileContent, true);
            break;
        }
    }

    if ($fileData !== null) {
        $cacheFilePath = $casheDir . $key;
        file_put_contents($cacheFilePath, json_encode($fileData));
    } else {
    }
}

function downloadAllFromGithub()
{
    global $endpoint, $casheDir;

    if (!canMakeRequest()) {
        return;
    }

    updateLastRequestTime();

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: Your-App-Name',
    ));

    $response = curl_exec($ch);

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        exit;
    }

    $fileData = null;

    foreach ($data as $item) {
        $fileCh = curl_init();
        curl_setopt($fileCh, CURLOPT_URL, $item['download_url']);
        curl_setopt($fileCh, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($fileCh, CURLOPT_HTTPHEADER, array(
            'User-Agent: Your-App-Name',

        ));

        $fileContent = curl_exec($fileCh);

        if (curl_errno($fileCh)) {
            curl_close($fileCh);
            continue;
        }

        curl_close($fileCh);

        $fileData = json_decode($fileContent, true);
        if ($fileData !== null) {
            $cacheFilePath = $casheDir . $item['name'];
            file_put_contents($cacheFilePath, json_encode($fileData));
        }
    }
}

function replaceUUID()
{
    $jsonFile = "cache/combined_data.json";
    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);
    $blockCount = count($data);



    foreach ($data as &$item) {
        if (is_array($item)) {
            $item['uuid'] = hash('sha256', json_encode($item));
        } else {
        }
    }
    file_put_contents($jsonFile, json_encode($data));
}

function addMissingType()
{
    global $combinedData;
    foreach ($combinedData as &$item) {
        if (!isset($item['type'])) {
            $item['type'] = 'information';
        }
    }
}

function getCombinedData()
{
    global $combinedData;
    $jsonFile = "cache/combined_data.json";
    $jsonString = file_get_contents($jsonFile);
    $combinedData = json_decode($jsonString, true);
    return $combinedData;
}

function getSlideShowData()
{
    global $slideShowData;
    $jsonFile = "cache/slideshow.json";
    $jsonString = file_get_contents($jsonFile);
    $slideShowData = json_decode($jsonString, true);
    return $slideShowData;
}


$parser = [
    "items" => getCombinedData(),
    "slides" => getSlideShowData()
];

echo json_encode($parser);
