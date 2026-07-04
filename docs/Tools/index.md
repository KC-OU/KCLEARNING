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
=== "Hydra"
    Hydra is a parallelized login cracker which supports numerous protocols to attack. It is very fast and flexible, and new modules are easy to add.
    ```text { .tldr }
    Online password guessing tool.
    Protocols supported include FTP, HTTP(S), SMTP, SNMP, XMPP, SSH, and more.
    More information: https://manned.org/hydra.

    - Start Hydra's wizard:
    hydra-wizard

    - Guess SSH credentials using a given username and a list of passwords:
    hydra -l username -P path/to/wordlist.txt host_ip ssh

    - Guess HTTPS webform credentials using two specific lists of usernames and passwords ("https_post_request" can be like "username=^USER^&password=^PASS^"):
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt host_ip https-post-form "url_without_host:https_post_request:login_failed_string"

    - Guess FTP credentials using usernames and passwords lists, specifying the number of threads:
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt -t n_tasks host_ip ftp

    - Guess MySQL credentials using a username and a passwords list, exiting when a username/password pair is found:
    hydra -l username -P path/to/wordlist.txt -f host_ip mysql

    - Guess RDP credentials using a username and a passwords list, showing each attempt:
    hydra -l username -P path/to/wordlist.txt -V rdp://host_ip

    - Guess IMAP credentials on a range of hosts using a list of colon-separated username/password pairs:
    hydra -C path/to/username_password_pairs.txt imap://[host_range_cidr]

    - Guess POP3 credentials on a list of hosts using usernames and passwords lists, exiting when a username/password pair is found:
    hydra -L path/to/usernames.txt -P path/to/wordlist.txt -M path/to/hosts.txt -F pop3
    ```
=== "Medusa"
    Medusa is intended to be a speedy, massively parallel, modular, login brute-forcer. The goal is to support as many services which allow remote authentication as possible.
    ```text { .tldr }
    A modular and parallel login brute-forcer for a variety of protocols.
    More information: https://manned.org/medusa.

    - List all installed modules:
    medusa -d

    - Show usage example of a specific module (use medusa -d for listing all installed modules):
    medusa -M ssh|http|web-form|postgres|ftp|mysql|... -q

    - Execute brute force against an FTP server using a file containing usernames and a file containing passwords:
    medusa -M ftp -h host -U path/to/username_file -P path/to/password_file

    - Execute a login attempt against an HTTP server using the username, password, and user-agent specified:
    medusa -M HTTP -h host -u username -p password -m USER-AGENT:"Agent"

    - Execute a brute force against a MySQL server using a file containing usernames and a hash:
    medusa -M mysql -h host -U path/to/username_file -p hash -m PASS:HASH

    - Execute a brute force against a list of SMB servers using a username and a pwdump file:
    medusa -M smbnt -H path/to/hosts_file -C path/to/pwdump_file -u username -m PASS:HASH
    ```
=== "Bopscrk"
    Targeted-attack wordlist creator: introduce personal info related to target, combines every word and transforms results into possible passwords. The lyricpass module allows one to search lyrics related to artists and include them to the wordlists

    ???+ info "No TLDR for this tool"
        There is no TLDR for Bopscrk, but here is the usage promt when you run bopscrk

    ```sh
    usage: bopscrk [-h] [-i] [-w ] [-m ] [-M ] [-c] [-l] [-n ] [-a ] [-o ] [-C ] [--version]
    Generates smart and powerful wordlists.

    options:
    -h, --help         show this help message and exit
    -i, --interactive  interactive mode, the script will ask you about target
    -w                 words to combine comma-separated (will be combined with all words)
    -m, --min          min length for the words to generate (default: 4)
    -M, --max          max length for the words to generate (default: 12)
    -c, --case         enable case transformations
    -l, --leet         enable leet transformations
    -n                 max amount of words to combine each time (default: 2)
    -a, --artists      artists to search song lyrics (comma-separated)
    -o, --output       output file to save the wordlist (default: tmp.txt)
    -C, --config       specify config file to use (default: /usr/lib/python3/dist-
                     packages/bopscrk/bopscrk.cfg)
    --version          print version and exit
    ```
=== "Brutespray"
    Brutespray automatically attempts default credentials on discovered services. It takes scan output from Nmap (GNMAP/XML), Nessus, Nexpose, JSON, and lists, then brute-forces credentials across 40+ protocols in parallel. Built in Go with an interactive terminal UI, embedded wordlists, and resume capability.

    ???+ info "No TLDR for this tool"
        There is no TLDR for Brutespray, but I found Quick Start on Github for the basic commands

    ```sh
    # From Nmap scan output
    brutespray -f nmap.gnmap -u admin -p password

    # Target a specific host
    brutespray -H ssh://192.168.1.1:22 -u admin -p passlist.txt

    # CIDR range
    brutespray -H ssh://10.1.1.0/24:22 -u root -p passlist.txt

    # Combo credentials
    brutespray -H ssh://10.0.0.1:22 -C root:root
    ``` 

=== "cewl"
    Based on a discussion on PaulDotCom (episode 129) about creating custom word lists spidering a targets website and collecting unique words I decided to write CeWL, the Custom Word List generator. CeWL is a ruby app which spiders a given URL to a specified depth, optionally following external links, and returns a list of words which can then be used for password crackers such as John the Ripper.
    ```text { .tldr }
    URL spidering tool for making a cracking wordlist from web content.
    More information: https://digi.ninja/projects/cewl.php#usage.

    - Create a wordlist file from the given URL up to 2 links depth:
    cewl --depth 2 --write path/to/wordlist.txt url

    - Output an alphanumeric wordlist from the given URL with words of minimum 5 characters:
    cewl --with-numbers --min_word_length 5 url

    - Output a wordlist from the given URL in debug mode including email addresses:
    cewl --debug --email url

    - Output a wordlist from the given URL using HTTP Basic or Digest authentication:
    cewl --auth_type basic|digest --auth_user username --auth_pass password url

    - Output a wordlist from the given URL through a proxy:
    cewl --proxy_host host --proxy_port port url
    ```
=== "Chntpw"
    Chntpw (Offline NT Password & Registry Editor) is a command-line utility used to reset or blank local Windows passwords. By editing the SAM (Security Account Manager) database on an unmounted disk, it bypasses the need for the original password, allowing you to regain access to locked local accounts.
    ```text { .tldr }
    chntpw

    A utility that can edit windows registry, reset user password, promote users to administrator by modifying the Windows SAM.
    Boot target machine with live cd like Kali Linux and run with elevated privileges.
    More information: https://pogostick.net/~pnh/ntpasswd/MANUAL.txt.

    - List all users in the SAM file:
    chntpw -l path/to/sam_file
    - Edit user interactively:
    chntpw -u username path/to/sam_file
    - Use chntpw interactively:
    chntpw -i path/to/sam_file
    ```
=== "Crunch"
    Crunch is a wordlist generator where you can specify a standard character set or a character set you specify. crunch can generate all possible combinations and permutations.
    ```text { .tldr }
    crunch

    Wordlist generator.
    More information: https://manned.org/crunch.

    - Output a list of words of length 1 to 3 with only lowercase characters:
    crunch 1 3

    - Output a list of hexadecimal words of length 8:
    crunch 8 8 0123456789abcdef

    - Output a list of all permutations of abc (lengths are not processed):
    crunch 1 1 -p abc

    - Output a list of all permutations of the given strings (lengths are not processed):
    crunch 1 1 -p abc def ghi

    - Output a list of words generated according to the given pattern and a maximum number of duplicate letters:
    crunch 5 5 abcde123 -t @@@12 -d 2@

    - Write a list of words in chunk files of a given size, starting with the given string:
    crunch 3 5 -o START -b 10kb -s abc

    - Write a list of words stopping with the given string and inverting the wordlist:
    crunch 1 5 -o START -e abcde -i

    - Write a list of words in compressed chunk files with a specified number of words:
    crunch 1 5 -o START -c 1000 -z gzip|bzip2|lzma|7z
    ```
=== "FCrackZip"
    fcrackzip is a free, command-line ZIP password cracking utility. It supports brute-force and dictionary attacks, and can crack standard ZIP encryption. It is widely used in penetration testing and forensics.

    ```text { .tldr }
    fcrackzip

    ZIP archive password cracking utility.
    More information: https://manned.org/fcrackzip.

    - Brute-force a password with a length of 4 to 8 characters and contains only alphanumeric characters (order matters):
    fcrackzip --brute-force --length 4-8 --charset aA1 archive

    - Brute-force a password in verbose mode with a length of 3 characters that only contains lowercase characters, $, and %:
    fcrackzip --verbose --brute-force --length 3 --charset a:$% archive

    - Brute-force a password that contains only lowercase and special characters:
    fcrackzip --brute-force --length 4 --charset a! archive

    - Brute-force a password containing only digits, starting from the password 12345:
    fcrackzip --brute-force --length 5 --charset 1 --init-password 12345 archive

    - Crack a password using a wordlist:
    fcrackzip --use-unzip --dictionary --init-password wordlist archive

    - Benchmark cracking performance:
    fcrackzip --benchmark
    ```

