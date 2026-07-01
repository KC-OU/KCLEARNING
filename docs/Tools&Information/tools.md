# Tools

## Overview
This page serves as a comprehensive reference guide for cybersecurity and penetration testing tools. Each tool entry includes:

- **Description**: A detailed explanation of the tool's purpose, capabilities, and primary use cases
- **TLDR**: A quick summary for users who need fast answers about what the tool does
- **Category**: Classification within cybersecurity domains (e.g., reconnaissance, exploitation, forensics)

Whether you're a security researcher, penetration tester, or cybersecurity student, use this resource to quickly identify the right tool for your security assessment needs.

---

## Extensive Cyber Security and Kali Linux Tools Master List
This document provides a highly structured, extensive directory of operational cybersecurity tools. It synthesizes primary industry frameworks along with deep integrations extracted from Kali Linux system installations, purposefully filtering out base libraries to focus purely on functional security software.

### 1. Social Engineering {.collapsible}
Tools engineered to exploit systemic human and credential authorization workflows through phishing vectors, credential harvesting, or replication of authentication workflows.

???+ info "No Tool will be added to this section"

    There is no Social Engineering Tool will be added to this section as most of them are python sctipts or web hosted tools. But if you have any idea or tool for this category please follow the trello board and add a suggestion

### 2. Password Cracking & Wordlist Generation {.collapsible}
Utilities tasked with cryptographic verification analysis, dictionary synthesis, and computational parallel extraction of plain-text states.

=== "Hashcat"
    Hashcat is the world's fastest, GPU-accelerated open-source password cracking and recovery tool, used by cybersecurity professionals to test password strength. 

    ```text { .tldr }
    Fast and advanced password recovery tool.
    More information: https://hashcat.net/wiki/doku.php?id=hashcat.

    - Perform a brute-force attack (mode 3) with the default hashcat mask:
    hashcat --hash-type hash_type_id --attack-mode 3 hash_value

    - Perform a brute-force attack (mode 3) with a known pattern of 4 digits:
    hashcat --hash-type hash_type_id --attack-mode 3 hash_value "?d?d?d?d"

    - Perform a brute-force attack (mode 3) using at most 8 of all printable ASCII characters:
    hashcat --hash-type hash_type_id --attack-mode 3 --increment hash_value "?a?a?a?a?a?a?a?a"

    - Perform a dictionary attack (mode 0) using a wordlist:
    hashcat --hash-type hash_type_id --attack-mode 0 hash_value path/to/wordlist.txt

    - Run a dictionary attack (mode 0) using the specified wordlist, applying rule-based transformations to mutate candidate passwords:
    hashcat --hash-type hash_type_id --attack-mode 0 --rules-file path/to/file.rule hash_value path/to/wordlist.txt

    - Perform a combination attack (mode 1) using the concatenation of words from two different custom dictionaries:
    hashcat --hash-type hash_type_id --attack-mode 1 hash_value path/to/dictionary1.txt path/to/dictionary2.txt

    - Show result of an already cracked hash:
    hashcat --show hash_value

    - Show all example hashes:
    hashcat --example-hashes
    ```


=== "John the Ripper"
    John the Ripper is a tool designed to help systems administrators to find weak (easy to guess or crack through brute force) passwords, and even automatically mail users warning them about it, if it is desired.

    ```text { .tldr }
    Password cracker.
    More information: https://www.openwall.com/john/.

     - Crack password hashes:
    john path/to/hashes.txt

    - Show passwords cracked:
    john --show path/to/hashes.txt

    - Display users' cracked passwords by user identifier from multiple files:
    john --show --users=user_ids path/to/hashes1.txt path/to/hashes2.txt ...

    - Crack password hashes, using a custom wordlist:
    john --wordlist=path/to/wordlist.txt path/to/hashes.txt

    - List available hash formats:
    john --list=formats

    - Crack password hashes, using a specific hash format:
    john --format=md5crypt path/to/hashes.txt

    - Crack password hashes, enabling word mangling rules:
    john --rules path/to/hashes.txt

    - Restore an interrupted cracking session from a state file, e.g. mycrack.rec:
    john --restore=path/to/mycrack.rec
    ```