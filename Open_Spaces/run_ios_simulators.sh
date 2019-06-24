declare -a simulators=("4252AB9B-F5A7-42E4-920D-24F708A7FD37" "D706893D-9A2B-4372-A9CA-02439091E074")

for i in "${simulators[@]}"
do
  xcrun instruments -w $i
  xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.10.0.app
  xcrun simctl openurl $i exp://127.0.0.1:19000
done
